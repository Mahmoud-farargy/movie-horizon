
import { LRUCache } from 'lru-cache'
import { hash as ohash } from 'ohash'
import { notFound } from "next/navigation";
import type { Credits, MediaItem, MediaType, PageResult, PersonItem } from '@/types';
import { TMDB_API_BASE_URL, blocked } from "./constants/appInfo";

const promiseCache = new LRUCache<string, PageResult<MediaItem>>({
    max: 500,
    ttl: 2000 * 60 * 60 // 2 hours
});
function toQueryString(params: Record<string, string | number | boolean | undefined>): string {
    return new URLSearchParams(
      Object.entries(params)
        .filter(([, value]) => value !== undefined)
        .map(([key, value]) => [key, String(value)])
    ).toString();
}
async function _fetchTMDB(url: string, params: Record<string, string | number | boolean | undefined> = {}){
    const token = process.env.NEXT_PUBLIC_TMDB_API_KEY;
    const paramsString = toQueryString(params);

    const res = await fetch(`${TMDB_API_BASE_URL}/${url}${paramsString ? `?${paramsString}`: ''}`, {cache: "no-store", headers: {
        "Authorization": `Bearer ${token}`,
        "accept": "application/json"
    }});


    return await res.json();
}

export async function fetchTMDB(url: string, params: Record<string, string | number | boolean | undefined> = {}) {
    const hash = ohash([url, params])
    let response = null;
    if(promiseCache.has(hash)){
        response = promiseCache.get(hash);
    }else {
        try {
            response = await _fetchTMDB(url, params);
            promiseCache.set(hash, response);
        } catch (error) {
            response = null;
            promiseCache.delete(hash);
            throw error;
        }

    }
    return response;
}

/**
 * Get Media list (movies/tv shows)
 */
export async function listMedia(type: MediaType, query: string, page: number): Promise<PageResult<MediaItem>> {
    const r = await fetchTMDB(`${type}/${query}`, { page }) as PageResult<MediaItem>
    r.results = r.results?.filter((m: MediaItem) => !blocked.has(m.id.toString()))
    return r
  }

/**
 * Get Media
 */
export function getMedia(type: MediaType, id: string): Promise<MediaItem> {
    if(blocked.has(id.toString())){       
        console.error('This media is under copyright restriction and cannot be viewed.');
        notFound()
    }
    return fetchTMDB(`${type}/${id}`, {
        append_to_response: 'videos,credits,images,external_ids,release_dates,combined_credits',
        include_image_language: 'en'
    })
}

/**
 * Get recommended
 */
export async function getRecommendations(type: MediaType, id: string, page = 1): Promise<PageResult<MediaItem>> {
    const r = await fetchTMDB(`${type}/${id}/recommendations`, { page }) as PageResult<MediaItem>
    r.results = r.results?.filter((media: MediaItem) => !blocked.has(media.id.toString()))
    return r
}

/**
 * Get TV show episodes from season (single)
 */
export function getTvShowEpisodes(id: string, season: string) {
    return fetchTMDB(`tv/${id}/season/${season}`);
}

/**
 * Get trending
 */
export function getTrending(media: string, page =1) {
    return fetchTMDB(`trending/${media}/week`, { page });
}

/**
 * Discover media by genre
 */
export async function getMediaByGenre(media: string, genre: string, page = 1): Promise<PageResult<MediaItem>> {
    const r = await fetchTMDB(`discover/${media}`, {
        with_generes: genre,
        page
    }) as PageResult<MediaItem>
    r.results = r.results?.filter((media: MediaItem) => !blocked.has(media.id.toString()));
    return r;
}

/**
 * Get credits
 */
export function getCredits(id: string | number, type: string): Promise<Credits> {
    return fetchTMDB(`person/${id}/${type}`);
}

/**
 * Get genre list
 */
export async function getGenreList(media: string): Promise<{name: string; id: number}[]> {
    return await fetchTMDB(`genre/${media}/list`).then(res => res.genres);
}

/**
 * Get person (single)
 */
export function getPerson(id: string): Promise<PersonItem> {
    return fetchTMDB(`person/${id}`, {
        append_to_response: 'images,combined_credits,external_ids',
        include_image_language: 'en',
    })
};

/**
 * Search (searches movies, tv and people)
 */
export async function searchShows(page =1, query: string) {
    const r = await fetchTMDB(`search/multi`, { query, page, include_adult: false });
    r.results = r.results?.filter((media: MediaItem) => !blocked.has(media.id.toString()))
    return r;
}