import { IMDB_IMAGE_BASE_URL } from "@/helpers/constants";
import type { PhotoItem } from "@/types";
import { memo } from "react";
import { CardImage } from "@/components";

function PhotoCard({
  item,
  className,
  onClick,
}: {
  item: PhotoItem;
  className: string;
  onClick?: () => void;
}) {
  return (
    <button
      className={`${className} block relative text-left bg-gray-400/10 transition-[transform] hover:scale-[1.02] z-[10]`.trim()}
      title="View Photo"
      onClick={onClick}
    >
      {/* == Photo == */}
      <CardImage
          width="400"
          height="600"
          src={item?.file_path ? `${IMDB_IMAGE_BASE_URL}${item.file_path}` : ''}
          alt=""
          loading="lazy"
          className="w-full h-full object-cover"
          errorIconName="magnifying-glass-plus"
          cardIconName="image"
      />
    </button>
  );
}

export default memo(PhotoCard);