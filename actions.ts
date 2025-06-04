"use server";
import { listMedia, getMediaByGenre, searchShows } from "@/helpers/tmdb";
import type { MediaType } from "@/types";

export async function fetchMedia(page: number = 1 , type: MediaType =  "movie", query: string = "") {
    return await listMedia(type, query, page);
};

export async function fetchGenre(page: number = 1 , type: MediaType =  "movie", id: string = "") {
    return await getMediaByGenre(type, id, page);
};

export async function fetchSearch(page: number = 1, query: string = "") {
    return await searchShows(page, query);
};