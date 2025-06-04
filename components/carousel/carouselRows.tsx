import type { QueryItem, PageResult, MediaItem } from "@/types";
import { CarouselRow, MediaCard } from "@/components";
import { useTranslations, useLocale } from "next-intl";
import { snakeCaseText } from "@/helpers/utils";
import NextLink from "next/link";

export default function CarouselRows({
  rowsData,
}: {
  rowsData: { queryItem: QueryItem; list: PageResult<MediaItem> }[];
}) {
  const locale = useLocale(); 
  const $t = useTranslations();
  return (
    <>
      {rowsData.length && (
        <div>
          {rowsData.map((rowItem) => {
            const titleNode = (
              <div> {$t(snakeCaseText(rowItem.queryItem.title))}</div>
            );
            const moreNode = (
              <NextLink
                href={`/${locale}/${rowItem.queryItem.type}/category/${rowItem.queryItem.query}`}
                className="mh__link"
              >
                {$t("explore_more")}
              </NextLink>
            );
            return (
              // Media (Movies/TV Shows)
              <CarouselRow
                key={rowItem.queryItem.type + rowItem.queryItem.query}
                moreNode={moreNode}
                titleNode={titleNode}
              >
                {rowItem.list?.results?.length ? (
                  rowItem.list.results.map((item) => (
                    <MediaCard
                      key={item.id}
                      item={item}
                      type={rowItem.queryItem.type}
                      className="flex-1 w-40 md:w-60"
                    />
                  ))
                ) : (
                  <div className="flex items-center justify-center h-full w-full opacity-50">
                    <strong>{$t("empty_list")}</strong>
                  </div>
                )}
              </CarouselRow>
            );
          })}
        </div>
      )}
    </>
  );
}
