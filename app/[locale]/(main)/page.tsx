import { listMedia, getMedia } from "@/helpers/tmdb";
import { getLocale } from 'next-intl/server';
import NextLink from "next/link";
import type { QueryItem } from "@/types";
import { MediaHero, CarouselRows } from "@/components";
import { QUERY_LIST } from "@/helpers/constants/index";
import { Fragment } from "react";
import { APP_INFO } from "@/helpers/constants/appInfo";

export async function generateMetadata() {
  return {
     title: APP_INFO.name,
     description: APP_INFO.description,
  };
}

export default async function Home() {
  const locale = await getLocale();
  const queries = [QUERY_LIST.movie[0], QUERY_LIST.tv[0]];

  const getMediaQueries = async (queryItem: QueryItem) => {
    return {
      queryItem,
      list: await listMedia(queryItem.type, queryItem.query, 1),
    };
  };

  const rowsData = await Promise.all(
    queries.map((query) => getMediaQueries(query))
  );

  const firstMovieItem = await getMedia(
    rowsData[0].queryItem.type,
    rowsData[0].list.results[0].id
  );

  return (
    <Fragment>
      {/* === Hero === */}
      <NextLink href={`/${locale}/${rowsData[0].queryItem.type}/${firstMovieItem.id}`}>
        <MediaHero item={firstMovieItem} />
      </NextLink>

      {/* === Carousel Queries/Rows === */}
      <CarouselRows rowsData={rowsData} />
    </Fragment>
  );
}
