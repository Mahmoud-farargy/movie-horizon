import { LOCALES } from '@/helpers/constants/languages'
import { YOUTUBE_IMG_BASE_URL } from "@/helpers/constants";
import type {  MediaItem, Video } from '@/types'


/**
 * Format date
 */
export function formatDate(string: string) {
  const date = new Date(string).toLocaleDateString("en")
  return date
}

/**
 * Format minutes into hours and mins
 */
export function formatTime(minutes: number) {
  // seconds
  const seconds = minutes * 60
  let secondsLeft = seconds

  // hours
  const hours = Math.floor(secondsLeft / 3600)
  secondsLeft = secondsLeft % 3600

  // mins
  const mins = Math.floor(secondsLeft / 60)
  secondsLeft = secondsLeft % 60

  return `${hours ? `${hours}h` : ''} ${mins}min`
}

export function numberWithCommas(number: number | string = 0) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export function formatLang(iso: string) {
  const fullLang = LOCALES.find(lang => lang.iso_639_1 === iso)

  if (fullLang)
    return fullLang.english_name

  return iso
}

export const snakeCaseText = (text: string) => {
  return text?.toLowerCase().split(" ").join("_") || "";
}

export const { format: formatVote } = Intl.NumberFormat('en-GB', { notation: 'compact', maximumFractionDigits: 1 })

export const routeNameGenerators = {
  singleMovie: (id: string) => {
    return `${id}`
  }
}

export function getTrailer(item: MediaItem) {
  const trailer = item.videos?.results?.find(video => video.type === 'Trailer')
  return getVideoLink(trailer)
}

export function getVideoLink(item?: Video) {
  if (!item?.key)
    return null
  return `https://www.youtube.com/embed/${item.key}?rel=0&showinfo=0&autoplay=0`
}

export function getYouTubeThumbnail(item: Video) {
   return `${YOUTUBE_IMG_BASE_URL}/vi/${item.key}/maxresdefault.jpg`;
}

const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));

// Convert float to fraction
export const toAspectRatio = (ratio: number, precision = 1000): string => {
  const denominator = precision;
  const numerator = Math.round(ratio * precision);
  const divisor = gcd(numerator, denominator);
  return `${numerator / divisor}:${denominator / divisor}`;
};