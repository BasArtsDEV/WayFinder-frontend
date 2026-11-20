import { useEffect, useState } from "react";
import type { Leaderboard } from "../../types/Leaderboard.ts";
import getLeaderboard from "../services/leaderboard.ts";

const PAGE_SIZE = 10;

export function useLeaderboard(huntId: number) {
  const [leaderboard, setLeaderboard] = useState<Leaderboard | null>(null),
    [visibleCount, setVisibleCount] = useState<number>(PAGE_SIZE),
    [error, setError] = useState<string | null>(null),
    [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    getLeaderboard(huntId)
      .then(setLeaderboard)
      .catch((err: unknown) => {
        setError(
          err instanceof Error
            ? err.message
            : "Une erreur est survenue. Veuillez réessayer plus tard.",
        );
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [huntId]);

  // eslint-disable-next-line one-var
  const entries = leaderboard?.entries ?? [],
    visibleEntries = entries.slice(0, visibleCount),
    currentEntry = entries.find((entry) => entry.isCurrentUser) ?? null,
    isCurrentEntryHidden =
      currentEntry !== null && !visibleEntries.includes(currentEntry);

  function showMore() {
    setVisibleCount((count) => count + PAGE_SIZE);
  }

  return {
    currentEntry: isCurrentEntryHidden ? currentEntry : null,
    error,
    hasMore: visibleCount < entries.length,
    isLoading,
    leaderboard,
    showMore,
    total: entries.length,
    visibleEntries,
  };
}
