/**
 * Function to format a rank as (e.g: 1er, 4ème)
 * @param rank number
 * @return string
 */
export function formatRank(rank: number): string {
  return rank === 1 ? "1er" : `${rank.toString()}ème`;
}

/**
 * Function to format a number of minutes as (e.g: 2 heures et 35 minutes)
 * @param totalMinutes number
 * @return string
 */
export function formatRemainingTime(totalMinutes: number): string {
  const hours = Math.floor(totalMinutes / 60),
    minutes = totalMinutes % 60,
    parts: string[] = [];

  if (hours > 0) {
    parts.push(`${hours.toString()} ${hours > 1 ? "heures" : "heure"}`);
  }

  if (minutes > 0 || hours === 0) {
    parts.push(`${minutes.toString()} ${minutes > 1 ? "minutes" : "minute"}`);
  }

  return parts.join(" et ");
}
