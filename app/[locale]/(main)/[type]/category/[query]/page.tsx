
import { MediaList } from "@/components";

import type { MediaItem, MediaType } from "@/types";
import { fetchMedia } from "@/actions";


export default async function CategoryPage({params} : { params: {type: MediaType, query: string}}) {
  const { query = "", type = "movie" } = await params;
  const initialPage = 1;
  const initialItems: MediaItem[] = (await fetchMedia(initialPage, type, query))?.results || [];

  return (
    <MediaList
      initialItems={initialItems}
      page={initialPage}
      query={query}
      type={type}
      fetcherKey="media">
        <span className="capitalize"> {query.replace(/_/g, ' ')}</span>
        <span>{type === 'tv' ? 'TV' : 'Movies'}</span>
    </MediaList>
  )
}
