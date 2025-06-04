"use client";
import { useAppContext } from "@/context"
import { useEffect, useMemo, useState } from "react";
import { CardImage } from "@/components";
import { IMDB_IMAGE_BASE_URL } from "@/helpers/constants";
import { Icon } from "@iconify/react/dist/iconify.js";
import { toAspectRatio } from "@/helpers/utils";


export default function PhotoModal() {
  const { images, setImages } = useAppContext();
  const {list: photos, initialIndex} = images
  const [activeImageIndex, setActiveImageIndex ] = useState<number>(initialIndex || 0);
  const currentImage = useMemo(() => photos?.[activeImageIndex], [photos, activeImageIndex]);

  useEffect(() => {
    setActiveImageIndex(initialIndex);
  }, [initialIndex]);

  const prev = () => {
    if(!photos.length){
        return;
    }
    setActiveImageIndex((prevIndexState) => (
        (prevIndexState - 1 + photos.length) % photos.length
    ));
  }

  const next = () => {
    if(!photos.length){
        return;
    }
    setActiveImageIndex((prevIndexState) => (
        (prevIndexState + 1) % photos.length
    ));
  }

  const resetImages = () => {
    setImages({list: [], initialIndex: 0});
  };

  return (
    <>
    {photos && currentImage && <div className="fixed top-0 left-0 right-0 bottom-0 z-10 bg-black/90 p-5 flex items-center justify-center">
        {/* Close Icon */}
        <button type="button" className="absolute top-1 right-1 z-[100] p-3 text-3xl bg-black/60 rounded-full"
            onClick={resetImages}>
            <i>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12z"/></svg>
            </i>
        </button>
        {/* Image */}
        <CardImage 
            key={currentImage.file_path}
            src={`${currentImage.file_path ? `${IMDB_IMAGE_BASE_URL}${currentImage.file_path}` : ''}`}
            alt={`Number ${activeImageIndex + 1}`}
            aria-hidden="true"
            className="max-w-full max-h-full object-contain"
            errorIconName="question"
            aspectRatio={toAspectRatio(currentImage.aspect_ratio)}
            width={currentImage.width}
            height={currentImage.height}
        />
        {/* Previous Button */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2">
            <button type="button" className="py-10 px-4 bg-black/30 opacity-30 hover:opacity-100"
                onClick={prev}>
                <Icon icon="ph:caret-left-light" className="text-3xl text-white" />
            </button>
        </div>
        {/* Next Button */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2">
            <button type="button" className="py-10 px-4 bg-black/30 opacity-30 hover:opacity-100"
                onClick={next}>
                <Icon icon="ph:caret-right-light" className="text-3xl text-white" />
            </button>
        </div>
        {/* Current Image number / Images Total Count */}
        <div className="absolute bottom-2 left-0 right-0 items-center">
            <div className="bg-black/50 px-4 py-2">
                { activeImageIndex +1} / { photos.length }
            </div>
        </div>
    </div>}
    </>
  )
}
