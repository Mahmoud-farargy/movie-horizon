import { getVideoLink, getYouTubeThumbnail } from "@/helpers/utils";
import type { Video } from "@/types";
import { memo, useCallback, useMemo } from "react";
import { CardImage } from "@/components";
import { useAppContext } from "@/context";


function VideoCard({item} :  {item: Video}) {
    const { setIframeSrc } = useAppContext();
    const videoThumbnail = useMemo(() => getYouTubeThumbnail(item), [item]);
    const playVideo = useCallback(() => {
        const video = getVideoLink(item);
        setIframeSrc(video);
    }, [setIframeSrc, item]);
  return (
    <button className="pb-1 text-left" onClick={playVideo}>
        <div className="block bg-gray-400/10 p-1 aspect-[16/9] transition-[transform] duration-[400ms] relative hover:scale-[1.02]">
            {/* Video Thumbnail */}
            <CardImage
                width="400"
                height="600"
                alt=""
                src={item.key ? videoThumbnail : ''}
                loading="lazy"
                className="object-cover w-full h-full"
                errorIconName="play"
                cardIconName="play"
            />
        </div>
        {/* Video Name & Type */}
        <div className="min-h-[4.25rem]">
            <div className="mt-2 line-clamp-2 overflow-hidden text-ellipsis whitespace-pre-line max-h-[3.2em] leading-[1.6em]">
                {item.name}
            </div>
            <div className="opacity-60 text-sm line-clamp-1 overflow-hidden text-ellipsis whitespace-pre-line max-h-[2.2em] leading-[1.5em]">
                {item.type}
            </div> 
        </div>
    </button>
  )
}

export default memo(VideoCard)