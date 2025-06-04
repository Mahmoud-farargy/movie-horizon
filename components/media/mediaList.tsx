"use client";
import { MediaGrid, MediaCard, NotAvailableList } from "@/components";
import type { MediaItem, MediaType, PageResult } from "@/types";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useRef, useState } from "react";
import { fetcherMap } from "@/lib/mediaFetchers.client";

// interfaces
interface MediaProps {
  initialItems: MediaItem[];
  type: MediaType;
  count?: number;
  page?: number;
  children: React.ReactNode;
  query?: string;
  fetcherKey: string
}

export default function MediaList({
  initialItems = [],
  page = 1,
  type,
  count,
  query,
  children,
  fetcherKey = "media"
}: MediaProps) {
  const tailList = useRef<HTMLDivElement | null>(null);
  const [isLoading, setLoadingState] = useState<boolean>(false);
  const [savedResponse, setSavedResponse] = useState<PageResult<MediaItem>>({
    page,
    total_pages: 2,
    results: initialItems,
    total_results: 2,
  });
  const $t = useTranslations();

  const loadMore = useCallback(async () => {
    const { page: currentPage, results: previousItems = [], total_pages: totalPages } = savedResponse || {};
    if(isLoading || (currentPage >= totalPages)){
        return;
    }
    setLoadingState(true);
    try{
        const fetcher = fetcherMap[fetcherKey];
        if(!fetcher){
            console.error(`No fetcher found for key: ${fetcherKey}`);
            return;
        }
        const res = await fetcher( currentPage +1, type, query );
        const newResponseObj = {
            ...res,
            results: [...previousItems, ...res?.results || []]
        }
        setSavedResponse(newResponseObj);
    } catch (error) {
        console.error(error);
    } finally {
        setLoadingState(false);
    }
  }, [savedResponse, isLoading, type, query, fetcherKey]);

  useEffect(() => {
    const rootConfig = {
      root: null,
    };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const isIntersecting = entry.intersectionRatio > 0;
        if (isIntersecting && !isLoading) {
          loadMore();
        }
      });
    }, rootConfig);
    
    if(tailList?.current) observer.observe(tailList.current);
    return () => observer.disconnect();
  }, [tailList, isLoading, loadMore]);

  return (
    <div>
      {/* == Title == */}
      <h1 className="flex px-8 pt-8 gap-2 text-3xl">{children}</h1>
      {/* == Items count == */}
      {count != null && (
        <div className="px-8 opacity-50">{$t("count_items", { count })}</div>
      )}

      {/*== List == */}
      <MediaGrid>
        {savedResponse?.results?.length > 0 ? (
          savedResponse.results.map((item: MediaItem, index: number) => (
            <MediaCard key={index} item={item} type={type} />
          ))
        ) : (
          <NotAvailableList />
        )}
      </MediaGrid>
      {/* == List bottom censor == */}
      <div ref={tailList} />

      {/* == Animation loader === */}
      {isLoading ? (
        <div className="animate-pulse p-10 text-center">
          <i className="animate-spin inline-block mx-auto text-white w-[2.35rem] h-[2.35rem]">
            <svg xmlns="http://www.w3.org/2000/svg" width="2.35rem" height="2.35rem" viewBox="0 0 24 24"><path fill="currentColor" d="M12 4V2A10 10 0 0 0 2 12h2a8 8 0 0 1 8-8"/></svg>
          </i>
        </div>
      ) : null}
    </div>
  );
}
