import { fetchMedia, fetchGenre, fetchSearch } from "@/actions";
import type { MediaItem, PageResult, MediaType } from "@/types";
export const fetcherMap: Record<string, (page: number, type?: MediaType, query?: string) => Promise<PageResult<MediaItem>>> = {
    media: fetchMedia,
    genre: fetchGenre,
    search: (page, query) => fetchSearch(page, query),
};
