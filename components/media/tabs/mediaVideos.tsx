import type { MediaItem } from "@/types";
import { useTranslations } from "next-intl";
import { VideoCard, NotAvailableList } from "@/components";
import { numberWithCommas } from "@/helpers/utils";

export default function MediaVideos({ item }: { item: MediaItem }) {
  const $t = useTranslations();
  return (
    <div className="flex flex-col px-3 sm:px-4 md:px-[3.5rem] lg:px-16 py-4 gap-6">
      {/* Videos Count */}
      <div className="opacity-50">
        {$t("number_of_videos", {
          numberOfVideos: numberWithCommas(item.videos?.results?.length || 0),
        })}
      </div>
      {/* Video Cards */}
      <div className="grid grid-cols-1 2xs:grid-cols-[repeat(auto-fill,minmax(20rem,1fr))] gap-4">
        {item.videos?.results ? (
          item.videos.results.map((videoItem) => (
            <VideoCard key={videoItem.id} item={videoItem} />
          ))
        ) : (
          <NotAvailableList className="items-center justify-center"/>
        )}
      </div>
    </div>
  );
}
