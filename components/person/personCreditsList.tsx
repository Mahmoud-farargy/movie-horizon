import type { MediaItem } from "@/types";
import { useTranslations, useLocale } from "next-intl";
import NextLink from "next/link";
import NextImg from "next/image";
import { Icon } from "@iconify/react/dist/iconify.js";
import { IMDB_IMAGE_BASE_URL } from "@/helpers/constants";
import NotAvailableList from "@/components/ui/notAvailableList";

export default function PersonCreditsList({
  items,
  title,
}: {
  items: MediaItem[];
  title: string;
}) {
  const locale = useLocale();
  const $t = useTranslations();
  const sortedCredits = [...items].sort((a, b) =>
    (b.release_date || b.first_air_date || "9999").localeCompare(
      a.release_date || a.first_air_date || "9999"
    )
  );
  return (
    <div className="flex flex-col gap-1 p-4 p-md-8">
      {title && <h2 className="text-2xl pb-4">{title}</h2>}
      {sortedCredits.length > 0 ? sortedCredits.map((creditItem, index) => (
        <NextLink
          href={`/${locale}/${creditItem.media_type}/${creditItem.id}`}
          key={index}
          className="flex gap-2 items-center px-2 py-3 bg-gray-300/5 hover:bg-gray-50/5 transition-colors duration-150 ease-linear"
        >
         <div className="w-[1.875rem] h-[1.875rem] md:w-[3.85rem] md:h-[3.85rem]">
            {creditItem.backdrop_path ? (
                <NextImg
                src={`${IMDB_IMAGE_BASE_URL}${creditItem.backdrop_path}`}
                alt=""
                width={30}
                height={30}
                className="object-contain w-full h-full"
                loading="lazy"
                />
            ) : (
                <div className="flex w-full h-full opacity-10">
                <Icon icon="ph:question" className="m-auto text-4xl" />
                </div>
            )}
         </div>

          <div className="flex gap-2 items-center">
            <div className="text-center w-20">
              {creditItem.release_date
                ? creditItem.release_date.slice(0, 4)
                : creditItem.first_air_date
                ? creditItem.first_air_date.slice(0, 4)
                : "-"}
            </div>
            <div>{creditItem.title || creditItem.name}</div>
            <div className="opacity-50">
              {creditItem.character
                ? $t("as_character", { character: creditItem.character })
                : ""}
            </div>
          </div>
        </NextLink>
      )) :
      <NotAvailableList />
      }
    </div>
  );
}
