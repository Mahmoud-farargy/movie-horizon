import { listMedia, getMedia } from "@/helpers/tmdb";
import { getLocale } from 'next-intl/server';
import NextLink from "next/link";
import type { MediaType, QueryItem } from "@/types";
import { MediaHero, CarouselRows } from "@/components";
import { QUERY_LIST } from "@/helpers/constants/index";
import { Fragment } from "react";
import { APP_INFO } from "@/helpers/constants/appInfo";

type MainMediaPageProps = {
  params: Promise<{ type: MediaType; id: string }>
}

export async function generateMetadata({
  params,
}: MainMediaPageProps) {
  const { type } = await params;
  return {
     title: `${type}: ${APP_INFO.name}`,
  };
}

export default async function Media(props: MainMediaPageProps) {
  const params = await props.params;
  const locale = await getLocale();
  const typeParam = (params?.type as MediaType) || "movie";
  const queries = QUERY_LIST[typeParam];
  const getMediaQueries = async(queryItem: QueryItem) => {
    return {
      queryItem,
      list: await listMedia(typeParam, queryItem.query, 1)
    }
  };

  const rowsData = await Promise.all(queries.map((query) => getMediaQueries(query)));

  const firstItem = await getMedia(typeParam, rowsData[0].list.results[0].id);

  return (
    <Fragment>
      {/* === Hero === */}
      <NextLink href={`/${locale}/${typeParam}/${firstItem.id}`}>
        <MediaHero item={firstItem} />
      </NextLink>

      {/* === Carousel Queries/Rows === */}
      <CarouselRows rowsData={rowsData}/>
    </Fragment>
  );
}
