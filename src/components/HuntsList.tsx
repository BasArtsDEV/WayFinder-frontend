import { useEffect, useState } from "react";
import type {
  TreasureHunt,
  TreasureHuntExtended,
  TreasureHuntsCollection,
} from "../../types/TreasureHunt.ts";
import { getTreasureHunts } from "../services/treasure-hunts.ts";
import getAverageRatings from "../utils/hunts.ts";
import Hunt from "./Hunt.tsx";

export default function HuntsList() {
  const [isLoading, setIsLoading] = useState<boolean>(true),
    [error, setError] = useState<string | null>(null),
    [hunts, setHunts] = useState<TreasureHuntExtended[] | null>(null);

  useEffect(() => {
    getTreasureHunts()
      .then(async (data: TreasureHuntsCollection) => {
        setIsLoading(true);
        const publicHunts = data.member
            .filter((hunt: TreasureHunt) => hunt.published)
            .sort(
              (hunt1: TreasureHunt, hunt2: TreasureHunt) =>
                Number(new Date(hunt2.creationDate)) -
                Number(new Date(hunt1.creationDate)),
            ),
          huntsWithRatings: TreasureHuntExtended[] = await Promise.all(
            publicHunts.map(async (hunt: TreasureHunt) => {
              const { averageRating, status } = await getAverageRatings(
                hunt.enrollments,
              );

              return {
                ...hunt,
                averageRating,
                status,
              };
            }),
          );

        setHunts(huntsWithRatings);
      })
      .catch((err: unknown) => {
        setHunts(null);
        setError(
          err instanceof Error
            ? err.message
            : "Une erreur est survenue. Veuillez réessayer plus tard.",
        );
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <div>Chargement des chasses aux trésors</div>;
  }

  if (error) {
    return <div style={{ color: "red" }}>Erreur : {error}</div>;
  }

  if (!hunts?.length) {
    return (
      <p>
        Aucune chasses au trésor publiques n&apos;est disponible pour le moment.
      </p>
    );
  }

  return (
    <div className="hunts-container">
      <div className="hunts-header">
        <h2>Chasses au trésor</h2>
      </div>

      <ul className={`hunts-list`}>
        {hunts.map((item: TreasureHuntExtended, index: number) => (
          <Hunt hunt={item} key={index} />
        ))}
      </ul>
    </div>
  );
}
