import { useEffect, useState } from "react";
import { Link } from "wouter";
import type {
  TreasureHunt,
  TreasureHuntsCollection,
} from "../../types/TreasureHunt.ts";
import { getTreasureHunts } from "../services/treasure-hunts.ts";

/**
 * Function to format the Hunt's creation date without writing this entire logic inside the component.
 * @param date string
 * @return string
 */
const formatDate = (date: string): string => {
  return new Date(date).toLocaleString("default", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  });
};

export default function HuntsList() {
  const [isLoading, setIsLoading] = useState<boolean>(true),
    [error, setError] = useState<string | null>(null),
    [publicHunts, setPublicHunts] = useState<TreasureHunt[] | null>(null);

  useEffect(() => {
    getTreasureHunts()
      .then((data: TreasureHuntsCollection) => {
        setIsLoading(true);
        setPublicHunts(
          data.member
            .filter((hunt: TreasureHunt) => hunt.published)
            .sort(
              (hunt1: TreasureHunt, hunt2: TreasureHunt) =>
                Number(new Date(hunt2.creationDate)) -
                Number(new Date(hunt1.creationDate)),
            ),
        );
      })
      .catch((err: unknown) => {
        setPublicHunts(null);
        setError(
          err instanceof Error
            ? err.message
            : "Une erreur est survenue. Veuillez réessayer plus tard.",
        );
      })
      .finally(() => {
        setIsLoading(false);
        setError(null);
      });
  }, []);

  if (isLoading) {
    return <div>Chargement de la requête......</div>;
  }

  if (error) {
    return <div style={{ color: "red" }}>Erreur : {error}</div>;
  }

  if (!publicHunts?.length) {
    return (
      <p>
        Aucune chasses au trésor publiques n&apos;est disponible pour le moment.
      </p>
    );
  }

  return (
    <div>
      <h1>Chasses au trésor publiques :</h1>

      <ul>
        {publicHunts.map((item: TreasureHunt) => (
          <li key={item.id}>
            <Link to="#">
              [{item.id}] {item.title}
            </Link>{" "}
            {formatDate(item.creationDate)}
          </li>
        ))}
      </ul>
    </div>
  );
}
