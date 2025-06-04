import type { MediaItem } from "@/types";
import NextLink from "next/link";
import { useLocale } from "next-intl";
import { IMDB_IMAGE_BASE_URL } from "@/helpers/constants";
import { StarsRate, CardImage } from "@/components";
import { formatVote } from "@/helpers/utils";
import { memo } from "react";

function MediaCard({
  item,
  className = "",
  type
}: {
  item: MediaItem;
  className?: string;
  type: string
}) {
  const locale = useLocale();
  return (
    <NextLink
      href={`/${locale}/${item.media_type || type}/${item.id}`}
      className={`pb-2 ${className}`.trim()}
    >
      {/* == Media Image == */}
      <div className="block bg-gray-400/10 p-1 aspect-[10/16] transition-[transform] duration-[400ms] ease-in-out hover:scale-105">
        <CardImage
            width="400"
            height="600"
            src={item.poster_path ? `${IMDB_IMAGE_BASE_URL}${item.poster_path}` : ''}
            alt=""
            className="w-full h-full object-cover"
            loading="lazy"
            errorIconName="question"
        />
      </div>
      {/* == Media Title == */}
      <div title={item.title || item.name} className="mt-2 text-ellipsis whitespace-nowrap overflow-hidden">
        {item.title || item.name}
      </div>
      {/* == Media IMDB Feedback == */}
      <div className="flex text-sm gap-2 items-center">
        <StarsRate value={item.vote_average} className="w-20" />
        <span className="opacity-60">{formatVote(item.vote_average)}</span>
      </div>
    </NextLink>
  );
}
export default memo(MediaCard);