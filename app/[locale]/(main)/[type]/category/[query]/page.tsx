import { MediaList } from "@/components"
import type { MediaItem, MediaType } from "@/types"
import { fetchMedia } from "@/actions"

type CategoryPageProps = {
  params: Promise<{
    type: MediaType
    query: string
  }>
}

export default async function CategoryPage(props: CategoryPageProps ) {
  const params = await props.params
  const { query = "", type = "movie" } = params
  const initialPage = 1

  const initialItems: MediaItem[] =
    (await fetchMedia(initialPage, type, query))?.results || []

  return (
    <MediaList
      initialItems={initialItems}
      page={initialPage}
      query={query}
      type={type}
      fetcherKey="media"
    >
      <span className="capitalize">{query.replace(/_/g, " ")}</span>
      <span>{type === "tv" ? "TV" : "Movies"}</span>
    </MediaList>
  )
}
