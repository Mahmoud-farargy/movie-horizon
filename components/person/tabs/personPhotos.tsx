"use client";
import { useCallback } from "react";
import type { PersonItem, PhotoItem } from "@/types";
import { PhotoCard, NotAvailableList } from "@/components";
import { useTranslations } from "next-intl";
import { useAppContext } from "@/context";

export default function PersonPhotos({ item }: { item: PersonItem }) {
  const $t = useTranslations();
  const { setImages } = useAppContext();
  const showImage = useCallback(
    (profileImages: PhotoItem[], index: number) => {
      setImages({list: profileImages, initialIndex: index});
    },
    [setImages]
  );
  return (
    <div className="flex flex-col px-6 md:px-16 gap-6">
      {/* == Title & Items count == */}
      <div className="flex mt-10 gap-2 items-baseline">
        <div className="text-2xl">{$t("person_photos")}</div>
        <div className="text-sm opacity-50">
          {$t("number_of_images", {
            numberOfImages: item.images?.profiles?.length ?? 0,
          })}
        </div>
      </div>
      {/* == Profile images == */}
      {item?.images?.profiles?.length ? (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(10rem,1fr))] md:grid-cols-[repeat(auto-fill,minmax(13rem,1fr))] gap-4">
          {item.images.profiles.map((imageItem, index) => (
            <PhotoCard
              key={imageItem.file_path}
              item={imageItem}
              className="aspect-[9/16] w-full h-full"
              onClick={() => showImage(item?.images?.profiles || [], index)}
            />
          ))}
        </div>
      ) : (
        <NotAvailableList />
      )}
    </div>
  );
}
