/**
 * Function to format a rank as (e.g: 1er, 4ème)
 * @param rank number
 * @return string
 */
export function formatRank(rank: number): string {
  return rank === 1 ? "1er" : `${rank.toString()}ème`;
}

/**
 * Function to format a remaining time in seconds (e.g: 2 heures et 35 minutes, ou 14 minutes et 32 secondes)
 *
 * @param totalSeconds number
 * @return string
 */
export function formatRemainingTime(totalSeconds: number): string {
  const hours = Math.floor(totalSeconds / 3600),
    minutes = Math.floor((totalSeconds % 3600) / 60),
    seconds = Math.round(totalSeconds % 60),
    parts: string[] = [];

  if (hours > 0) {
    parts.push(`${hours.toString()} ${hours > 1 ? "heures" : "heure"}`);
  }

  if (minutes > 0 || hours > 0) {
    parts.push(`${minutes.toString()} ${minutes > 1 ? "minutes" : "minute"}`);
  }

  if ((seconds > 0 || totalSeconds === 0) && hours === 0) {
    parts.push(`${seconds.toString()} ${seconds > 1 ? "secondes" : "seconde"}`);
  }

  return parts.join(" et ");
}
