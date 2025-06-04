import type { MediaItem, MediaType } from "@/types";
import { useMemo } from "react";
import { IMDB_IMAGE_BASE_URL } from "@/helpers/constants";
import { useTranslations, useLocale } from "next-intl";
import { formatDate, formatTime, numberWithCommas } from "@/helpers/utils";
import { ExternalLinks, CardImage } from "@/components";
import NextLink from "next/link";

export default function MediaInfo({item, type}: { item: MediaItem; type: MediaType;}) {
    const locale = useLocale();
    const $t = useTranslations();
    const externalIds = useMemo(() => ({...item.external_ids, homepage: item.homepage}),[item]);
    const directors = useMemo(() => item.credits?.crew?.filter(director => director.job === "Director"),[item]);

    return (
      <div className="p-4 grid grid-cols-[max-content_1fr] gap-8 items-center m-auto max-w-[75rem]">
        {/* == Media Image == */}
        <div className="hidden md:block border-4 border-[#9ca3af1a] w-[19.75rem] aspect-[10/16]">
          <CardImage
            width="400"
            height="600"
            src={`${IMDB_IMAGE_BASE_URL}${item.poster_path}`}
            alt={item.title || item.name || ""}
            className="w-full object-cover aspect-[10/16]"
            errorIconName="question"
            />
        </div>
          {/* == Overview == */}
          <div className="w-[calc(100vw-2rem)] md:w-full flex flex-col p-4 md:p-0 gap-6">
            {item.overview &&
            <div>
              <h2 className="text-3xl mb-4">
                {$t("storyline")}
              </h2>
              <div className="opacity-80">
                { item.overview }
              </div>
            </div>
            }
          {/* == Media Info == */}
          <div className="text-sm opacity-80">
            <div className="grid grid-cols-[max-content_1fr] md:grid-cols-[max-content_1fr_max-content_1fr] gap-3 items-center">
              {/* Release date */}
              { item.release_date && <>
                <div>
                  {$t("release_date")}
                </div>
                <div>
                  {formatDate(item.release_date || '')}
                </div>
              </>}

              {/* Runtime */}
              { item.runtime && <>
                <div>
                  {$t("runtime")}
                </div>
                <div>
                  {formatTime(item.runtime || 0)}
                </div>
              </>}

              {/* Director(s) */}
              { directors?.length && <>
                <div>
                  {$t("director")}
                </div>
                <div className="flex flex-wrap gap-1">
                  {
                    directors.map((director) => (
                      <NextLink
                        href={`/${locale}/person/${director.id}`}
                        className="bg-[#9ca3af1a] hover:bg-gray-500/20 px-2 py-1 rounded-md text-xs"
                        key={director.id}
                      >
                        {director.name}
                      </NextLink>
                    ))
                  }
                </div>
              </>}

              {/* Budget */}
                <div>
                  { $t("budget")}
                </div>
                <div>
                  ${ numberWithCommas(item.budget)}
                </div>

              {/* Revenue */}
              <div>
                  { $t("revenue")}
                </div>
                <div>
                  ${ numberWithCommas(item.revenue)}
              </div>

              {/* Genre */}
                <div>
                  { $t("genre")}
                </div>
                <div className="flex flex-wrap gap-1">
                  {
                    item.genres?.map((genre) => (
                      <NextLink
                        href={`/${locale}/genre/${genre.id}/${type}`}
                        className="bg-[#9ca3af1a] hover:bg-gray-500/20 px-2 py-1 rounded-md text-xs"
                        key={genre.id}
                      >
                        {genre.name}
                      </NextLink>
                    ))
                  }
                </div>

                {/* Status */}
                <div>
                  { $t("status")}
                </div>
                <div>
                  { item.status }
              </div>

              {/* Language */}
                <div>
                  { $t("language")}
                </div>
                <div>
                  { item.original_language }
              </div>

              {/* Production */}
                {item?.production_companies?.length && 
                <>
                  <div>
                    { $t("production")}
                  </div>
                  <div>
                    { item.production_companies.map(company => company.name).join(", ") }
                </div>
                </>
                }
            </div>     
            <div>
              {/* External links */}
              <ExternalLinks links={externalIds} />
            </div>
          </div>
          </div>
      </div>

    )
  }