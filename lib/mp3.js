/**
 * Converts a Winamp rating value to a string value 0-100.
 */
export function convertMp3WinampRating(value) {
  const stars = Math.round(value / 0.25) + 1
  return String(stars * 20)
}
