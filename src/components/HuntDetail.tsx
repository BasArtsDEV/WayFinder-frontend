import { useEffect, useState } from "react";
import { useParams } from "wouter";
import type { TreasureHunt } from "../../types/TreasureHunt.ts";
import { getTreasureHuntById } from "../services/treasure-hunts.ts";

export default function HuntDetail() {
  const [isLoading, setIsLoading] = useState<boolean>(true),
    [error, setError] = useState<string | null>(null),
    [hunt, setHunt] = useState<TreasureHunt | null>(null),
    { id: huntIdParam } = useParams();

  useEffect(() => {
    getTreasureHuntById(Number(huntIdParam))
      .then((data: TreasureHunt) => {
        setIsLoading(true);
        setHunt(data);
      })
      .catch((err: unknown) => {
        setHunt(null);
        setError(
          err instanceof Error
            ? err.message
            : "Une erreur est survenue. Veuillez réessayer plus tard.",
        );
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [huntIdParam]);

  if (isLoading) {
    return <div>Chargement de la chasse au trésor...</div>;
  }

  if (error) {
    return <div style={{ color: "red" }}>Erreur : {error}</div>;
  }

  if (!hunt) {
    return <p>Pas de chasse trouvée.</p>;
  }

  return (
    <div>
      <h1>Chasse actuelle :</h1>

      <h2>{hunt.title}</h2>
    </div>
  );
}
