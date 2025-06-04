"use client"
import type { MediaItem } from "@/types";
import NextImage from "next/image";
import { StarsRate } from "@/components";
import { formatVote, formatTime } from "@/helpers/utils";
import { IMDB_IMAGE_BASE_URL } from "@/helpers/constants";
import { useTranslations } from "next-intl";
import { Fragment, memo, useMemo } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useAppContext } from "@/context";
import { getTrailer } from "@/helpers/utils"

function MediaHero({ item }: {item: MediaItem}) {
  const $t = useTranslations();
  const trailer = useMemo(() => getTrailer(item), [item]);
  const { setIframeSrc } = useAppContext();
  const playTrailer = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIframeSrc(trailer);
  }
  return (
      <Fragment>
      <div key={item.id} className="relative aspect-[3/2] lg:aspect-[25/9] bg-black min-h-[20rem]">
      {/* === hero media image === */}
        <div className="absolute top-0 right-0 bottom-0 left-0 lg:left-1/3">
          <NextImage 
            width="1220"
            height="659"
            src={`${IMDB_IMAGE_BASE_URL}${item.backdrop_path}`}
            alt={item.title || item.name || ''}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </div>
        <div className="absolute bottom-0 left-0 top-0 flex flex-col justify-center bg-gradient-to-t right-0 p-5 md:p-10 lg:bg-gradient-to-r lg:w-2/3 lg:px-20 from-black via-black to-transparent">
          {/* === hero media info === */}
          <div className="hero--transition"> 
            <h1 className="mt-2 text-4xl lg:text-5xl line-clamp-2">
              {item.title || item.name}
            </h1>
            <div className="flex row flex-wrap gap-2 items-center mt-4">
              {/* stars */}
              <StarsRate className="w-[6.25rem]" value={item.vote_average}/>
              <div className="hidden opacity-50 md:block">
                { formatVote(item.vote_average)}
              </div>
              {/* reviews */}
              <span className="hidden opacity-50 md:block">·</span>
              <div className="hidden opacity-50 md:block">
                { $t("number_of_reviews", {numberOfReviews: formatVote(item.vote_count)})}
              </div>
              {/* release date */}
              {
                item.release_date && <>
                  <span className="opacity-50">·</span>
                  <div className="opacity-50">
                    { item.release_date.slice(0, 4)}
                  </div>
                </>
              }
              {/* runtime */}
              {
                item.runtime && <>
                  <span className="opacity-50">·</span>
                  <div className="opacity-50">
                    { formatTime(item.runtime) }
                  </div>
                </>
              }
            </div>
              {/* overview */}
              <p className="mt-2 opacity-80 leading-relaxed overflow-hidden line-clamp-3 md:line-clamp-5 text-xs md:text-base">
                { item.overview }
              </p>
              {/* trailer button */}
              { trailer && <div className="py-5 lg:block">
                <button
                  type="button"
                  className="flex gap-2 items-center py-3 px-6 bg-gray-900/5 hover:bg-gray-400/20 transition-colors duration-200"
                  title={$t('watch_trailer')}
                  onClick={(e) => playTrailer(e)}
                >
                  <Icon icon="ph:play" />
                  { $t('watch_trailer')}
                </button>
              </div>}
            {/* floating play button */}
            {trailer && <div className="absolute lg:hidden left-0 top-0 right-0 h-2/3 items-center justify-center">
              <button
                type="button"
                className="items-center p-10 text-5xl opacity-20 hover:opacity-80 transition-colors duration-200"
                title={$t('watch_trailer')}
                onClick={(e) => playTrailer(e)}
              >
                <Icon icon="ph:play-circle-light" />
              </button>
            </div>}
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default memo(MediaHero);