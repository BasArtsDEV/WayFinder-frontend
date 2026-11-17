import type { TreasureHunt } from "../../types/TreasureHunt.ts";
import { formatRemainingTime } from "./riddle.ts";

export type HuntSort = "recent" | "rating" | "title";

/**
 * Function to format the number of riddles of a hunt (e.g: 3 énigmes)
 */
export function formatRiddlesCount(hunt: TreasureHunt): string {
  const count = hunt.riddles.length;

  return `${count.toString()} ${count > 1 ? "énigmes" : "énigme"}`;
}

/**
 * Function to format the time limit of a hunt (e.g: 1 heure et 30 minutes)
 */
export function formatHuntDuration(hunt: TreasureHunt): string {
  return formatRemainingTime(hunt.duration);
}

/**
 * Function to format the average rating of a hunt (e.g: 4,5 / 5)
 */
export function formatHuntRating(hunt: TreasureHunt): string {
  return hunt.averageStars
    ? `${hunt.averageStars.toFixed(1).replace(".", ",")} / 5`
    : "Pas encore notée";
}

function normalize(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/gu, "")
    .toLowerCase()
    .trim();
}

/**
 * Returns the hunts matching a search, sorted
 */
export function filterHunts(
  hunts: TreasureHunt[],
  search: string,
  sort: HuntSort,
): TreasureHunt[] {
  const query = normalize(search),
    matching = hunts.filter(
      (hunt) =>
        normalize(hunt.title).includes(query) ||
        normalize(hunt.team.name).includes(query),
    );

  return matching.sort((first, second) => {
    if (sort === "rating") {
      return (second.averageStars ?? 0) - (first.averageStars ?? 0);
    }

    if (sort === "title") {
      return first.title.localeCompare(second.title, "fr");
    }

    return (
      new Date(second.creationDate).getTime() -
      new Date(first.creationDate).getTime()
    );
  });
}
