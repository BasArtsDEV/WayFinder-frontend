import { useEffect, useState } from "react";
import { useParams } from "wouter";
import type { CreatorTeam } from "../../types/Team.ts";
import type { TreasureHunt } from "../../types/TreasureHunt.ts";
import {
  getTeamByTreasureHunt,
  getTreasureHuntById,
} from "../services/treasure-hunts.ts";
import formatDate from "../utils/global.ts";

export default function HuntDetail() {
  const [isLoading, setIsLoading] = useState<boolean>(true),
    [error, setError] = useState<string | null>(null),
    [hunt, setHunt] = useState<TreasureHunt | null>(null),
    [team, setTeam] = useState<CreatorTeam | null>(null),
    { id: huntIdParam } = useParams();

  useEffect(() => {
    if (!huntIdParam) return;
    setIsLoading(true);

    getTreasureHuntById(Number(huntIdParam))
      .then((data: TreasureHunt) => {
        setHunt(data);

        const teamParam = data.team.split("/").pop();
        if (teamParam) {
          return getTeamByTreasureHunt(teamParam);
        }

        return null;
      })
      .then((data: CreatorTeam | null) => {
        setTeam(data);
      })
      .catch((err: unknown) => {
        setHunt(null);
        setTeam(null);
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

  // eslint-disable-next-line one-var
  const enrollmentsCount: number = hunt.enrollments.length;

  return (
    <div className="hunt-detail-container">
      <div className="hunt-detail-badges">
        <span>{hunt.published ? "PUBLIE" : "NON-PUBLIE"}</span>
        <span>{enrollmentsCount}</span>
      </div>

      <div className="hunt-detail-texts">
        <h2>{hunt.title}</h2>
        <p>{hunt.description}</p>
      </div>

      <div className="hunt-detail-footer">
        <span>Créee par l&apos;équipe {team?.name}</span>
        <span>Création {formatDate(hunt.creationDate)}</span>
        <span>Code d&apos;invitation {hunt.invitationCode}</span>
        <button>Dépublier</button>
      </div>
    </div>
  );
}
