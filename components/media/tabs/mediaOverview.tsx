import { Fragment } from "react";
import type { MediaItem, MediaType } from "@/types";
import { CarouselRow, MediaInfo, PersonCard } from "@/components";
import { useTranslations } from "next-intl";

export default function MediaOverview({
  item,
  type,
}: {
  item: MediaItem;
  type: MediaType;
}) {
  const $t = useTranslations();
  const titleNode = <div> {$t("cast")}</div>;
  return (
    <Fragment>
      {/* Media Info */}
      <MediaInfo item={item} type={type} />

      {/* Cast (Actors/Actresses) */}
      <CarouselRow titleNode={titleNode}>
        {item.credits?.cast?.map((castItem) => (
          <PersonCard key={castItem.id} item={castItem} className="flex-1 w-40 md:w-60"/>
        ))}
      </CarouselRow>
    </Fragment>
  );
}
