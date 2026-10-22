import { useEffect, useState } from "react";
import { useParams } from "wouter";
import type { CreatorTeam } from "../../types/Team.ts";
import type { TreasureHunt } from "../../types/TreasureHunt.ts";
import {
  getTeamByTreasureHunt,
  getTreasureHuntById,
} from "../services/treasure-hunts.ts";
import formatDate, { copyToClipboard } from "../utils/global.ts";

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
  const riddlesCount: number = hunt.riddles.length;

  return (
    <div className="hunt-detail-container">
      <article className="hunt-detail">
        <div className="hunt-detail__main">
          <div className="hunt-detail__badges">
            <span className="hunt-detail__badge hunt-detail__badge--count">
              <i className="bi bi-layers-fill text-primary"></i>
              {riddlesCount} {riddlesCount > 1 ? "énigmes" : "énigme"}
            </span>

            <span className="hunt-detail__badge hunt-detail__badge--count">
              <i className="bi bi-star-fill text-warning"></i>
              {hunt.averageStars?.toFixed(1)}
            </span>
          </div>

          <h2 className="hunt-detail__title">{hunt.title}</h2>
          <p className="hunt-detail__description">{hunt.description}</p>
        </div>

        <div className="hunt-detail__footer">
          <p className="hunt-detail__team">
            Créée par l&apos;équipe <strong>{team?.name}</strong>
          </p>

          <div className="hunt-detail__meta">
            <div className="hunt-detail__meta-item">
              <span>Création</span>
              <p>le {formatDate(hunt.creationDate)}</p>
            </div>

            <div className="hunt-detail__meta-item">
              <span>Code d&apos;invitation</span>
              <p
                onClick={() => copyToClipboard(hunt?.invitationCode)}
                className="hunt-detail__code"
              >
                {hunt.invitationCode}
                <i className="bi bi-clipboard text-success"></i>
              </p>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
