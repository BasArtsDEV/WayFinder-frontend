import { useEffect, useState } from "react";
import type {
  TreasureHunt,
  TreasureHuntsCollection,
} from "../../types/TreasureHunt.ts";
import {
  getTreasureHuntById,
  getTreasureHunts,
} from "../services/treasure-hunts.ts";

function getMessage(err: unknown): string {
  return err instanceof Error
    ? err.message
    : "Une erreur est survenue. Veuillez réessayer plus tard.";
}

export function useTreasureHunts() {
  const [hunts, setHunts] = useState<TreasureHunt[]>([]),
    [error, setError] = useState<string | null>(null),
    [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    getTreasureHunts()
      .then((data: TreasureHuntsCollection) => {
        setHunts(data.member);
      })
      .catch((err: unknown) => {
        setError(getMessage(err));
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return { error, hunts, isLoading };
}

export function useTreasureHunt(huntId: number) {
  const [hunt, setHunt] = useState<TreasureHunt | null>(null),
    [error, setError] = useState<string | null>(null),
    [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    getTreasureHuntById(huntId)
      .then(setHunt)
      .catch((err: unknown) => {
        setError(getMessage(err));
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [huntId]);

  return { error, hunt, isLoading };
}
