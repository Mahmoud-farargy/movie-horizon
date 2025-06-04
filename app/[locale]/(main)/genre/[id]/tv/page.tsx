
import { MediaList } from "@/components";

import type { MediaItem, MediaType } from "@/types";
import { fetchGenre } from "@/actions";
import { getGenreList } from "@/helpers/tmdb";

export default async function CategoryPage({params} : { params: Promise<{type: MediaType, id: string}>}) {
  const { id = "" } = await params;
  const type = "tv" as MediaType;
  const initialPage = 1;
  const list = await getGenreList(type)
  const name = list.find(item => item.id === +id)?.name
  const initialItems: MediaItem[] = (await fetchGenre(initialPage, type, id))?.results || [];

  return (
    <MediaList
      initialItems={initialItems}
      page={initialPage}
      type={type}
      fetcherKey="genre">
        <span>{type === 'tv' ? 'TV' : 'Movies'} Genre: {name}</span>
    </MediaList>
  )
}
