import { useEffect, useState } from "react";
import { Link, useParams } from "wouter";
import type { TreasureHunt } from "../../types/TreasureHunt.ts";
import { ROUTES } from "../config.ts";
import { getTreasureHuntById } from "../services/treasure-hunts.ts";
import formatDate, { copyToClipboard } from "../utils/global.ts";
import FeedbacksList from "./FeedbacksList.tsx";
import HuntPlayActions from "./HuntPlayActions.tsx";

export default function HuntDetail() {
  const [isLoading, setIsLoading] = useState<boolean>(true),
    [error, setError] = useState<string | null>(null),
    [hunt, setHunt] = useState<TreasureHunt | null>(null),
    { id: huntIdParam } = useParams();

  useEffect(() => {
    if (!huntIdParam) return;

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

  // eslint-disable-next-line one-var
  const riddlesCount: number = hunt.riddles.length,
    teamId: string = hunt.team["@id"].split("/").pop() ?? "";

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
            Créée par l&apos;équipe&nbsp;
            <Link to={`~${ROUTES.TEAMS}/${teamId}`}>{hunt.team.name}</Link>
          </p>

          <div className="hunt-detail__meta">
            <div className="hunt-detail__meta-item">
              <span>Création</span>
              <p>le {formatDate(hunt.creationDate)}</p>
            </div>

            <div className="hunt-detail__meta-item">
              <span>Code d&apos;invitation</span>
              <p
                onClick={() => {
                  copyToClipboard(hunt.invitationCode);
                }}
                className="hunt-detail__code"
              >
                {hunt.invitationCode}
                <i className="bi bi-clipboard text-success"></i>
              </p>
            </div>
          </div>
        </div>

        <HuntPlayActions hunt={hunt} />

        <FeedbacksList huntId={hunt.id} />
      </article>
    </div>
  );
}
