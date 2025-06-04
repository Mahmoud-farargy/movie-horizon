import type { PersonItem } from "@/types";
import NextLink from "next/link";
import { useLocale } from "next-intl";
import { IMDB_IMAGE_BASE_URL } from "@/helpers/constants";
import { CardImage } from "@/components";
import { memo } from "react";

function PersonCard({
  item,
  className,
}: {
  item: PersonItem;
  className: string;
}) {
  const locale = useLocale();
  return (
    <NextLink href={`/${locale}/person/${item.id}`} className={className}>
      {/* Cast image */}
      <div className="block bg-gray-50/10 p-1 aspect-[10/16] transition-[transform] duration-[400ms] hover:scale-105">
        <CardImage
          width="500"
          height="800"
          src={
            item.profile_path
              ? `${IMDB_IMAGE_BASE_URL}/${item.profile_path}`
              : ""
          }
          alt={item.name || item.original_name}
          className="w-full h-full object-cover"
          loading="lazy"
          errorIconName="user"
        />
      </div>
      {/* Cast name */}
      <div className="mt-2">{item.name || item.original_name}</div>
      {/* Character/Department */}
      <div className="opacity-50">
        {item.character || item.known_for_department}
      </div>
    </NextLink>
  );
}
export default memo(PersonCard);