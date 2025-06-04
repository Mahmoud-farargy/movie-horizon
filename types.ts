export type MediaType = 'movie' | 'tv'

export type ExtenalLinksTypes = {
    twitter_id?: string;
    facebook_id?: string;
    instagram_id?: string;
    imdb_id?: string;
    github_id?: string;
    linkedin_id?: string;
    email?: string;
    homepage?: string;
};

export interface MediaItem {
  adult: boolean
  backdrop_path: string
  genre_ids: number[]
  id: string
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  release_date?: string
  first_air_date?: string
  title: string
  name?: string
  video: boolean
  vote_average: number
  vote_count: number
  media_type?: MediaType
  // details
  homepage?: string
  runtime?: number
  budget?: number
  revenue?: number
  status?: string
  genres?: Genre[]
  production_companies?: {name: string}[]
  videos?: {
    results: Video[]
  }
  credits?: {
    cast: PersonItem[]
    crew: PersonItem[]
  }
  images?: {
    backdrops: PhotoItem[]
    posters: PhotoItem[]
  }
  external_ids?: ExternalIds
  // cast
  character?: string
}

export interface PersonItem {
  adult: boolean
  gender: number
  id: number
  known_for_department: string
  name: string
  original_name: string
  profile_path: string
  popularity: number
  cast_id?: number
  job?: string
  character?: string
  credit_id: string
  order: number
  // details
  also_known_as?: string[]
  birthday?: string
  place_of_birth?: string
  homepage?: string
  biography?: string
  external_ids?: ExternalIds
  combined_credits?: {
    cast?: MediaItem[]
    crew?: MediaItem[]
  }
  images?: {
    profiles: PhotoItem[]
  }
}

export interface Video {
  iso_639_1: string
  iso_3166_1: string
  name: string
  key: string
  site: string
  size: number
  type: string
  official: boolean
  published_at: string
  id: string
}

export interface PhotoItem {
  aspect_ratio: number
  height: number
  iso_639_1: string
  file_path: string
  vote_average: number
  vote_count: number
  width: number
}

export interface ExternalIds {
  imdb_id?: string
  facebook_id?: string
  instagram_id?: string
  twitter_id?: string
  linkedin_id?: string
  github_id?: string
  email?: string
  homepage?: string
}

export interface PageResult<T> {
  page: number
  results: T[]
  total_pages: number
  total_results: number
}

export interface Genre {
  id: number
  name: string
}

export interface QueryItem {
  type: MediaType
  title: string
  query: string
}

export interface Credits {
  cast: MediaItem[]
}