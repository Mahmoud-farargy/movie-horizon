import type { PersonItem } from "@/types"
import { MediaCard, MediaGrid } from "@/components"

export default function PersonGrid({ item }: { item: PersonItem }) {
  return (
    <MediaGrid>
      {item?.combined_credits?.cast?.map((creditItem, index) => (
          creditItem.release_date && (
            <MediaCard key={index} item={creditItem} type="movie" />
          )
      ))}
    </MediaGrid>
  )
}
