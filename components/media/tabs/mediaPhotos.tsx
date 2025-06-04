import { PhotoCard, NotAvailableList } from "@/components";
import { numberWithCommas } from "@/helpers/utils";
import type { MediaItem, PhotoItem } from "@/types";
import { useTranslations } from "next-intl";
import { useCallback, useMemo } from "react";
import { useAppContext } from "@/context";

export default function MediaPhotos({ item }: { item: MediaItem }) {
  const $t = useTranslations();
  const { setImages } = useAppContext();
  const backdrops = useMemo(() => item.images?.backdrops ?? [], [item]);
  const posters = useMemo(() => item.images?.posters ?? [], [item]);

  const showImage = useCallback((posters: PhotoItem[], index: number) => {
    setImages({list: posters, initialIndex: index});
  }, [setImages]);

  return (
    <div className="flex flex-col px-4 sm:px-[3.5rem] md:px-8 lg:px-16 py-8 gap-6">
      {/* == Backdrop Images == */}
      <div className="flex gap-2 items-baseline">
        <div className="text-2xl">{$t("backdrops")}</div>
        <div className="text-sm opacity-50">
          {$t("number_of_images", {
            numberOfImages: numberWithCommas(backdrops?.length || 0),
          })}
        </div>
      </div>
      {backdrops?.length ? (
        <div className="grid grid-cols-1 2xs:grid-cols-[repeat(auto-fill,minmax(20rem,1fr))] gap-4">
          {backdrops.map((imageItem, index) => (
            <PhotoCard
              key={imageItem.file_path}
              item={imageItem}
              className="aspect-[16/9] w-full h-full"
              onClick={() => showImage(posters, index)}
            />
          ))}
        </div>
      ) : (
        <NotAvailableList />
      )}
      {/* == Posters == */}
      <div className="flex gap-2 items-baseline">
        <div className="text-2xl">{$t("posters")}</div>
        <div className="text-sm opacity-50">
          {$t("number_of_images", {
            numberOfImages: numberWithCommas(posters?.length || 0),
          })}
        </div>
      </div>
      {posters?.length ? (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(15rem,1fr))] gap-4">
          {posters.map((imageItem, index) => (
            <PhotoCard
              key={imageItem.file_path}
              item={imageItem}
              className="aspect-[9/16] w-full h-full"
              onClick={() => showImage(posters, index)}
            />
          ))}
        </div>
      ) : (
        <NotAvailableList />
      )}
    </div>
  );
}
