import { useEffect, useState } from "react";
import { Link } from "wouter";
import type {
  TreasureHunt,
  TreasureHuntExtended,
  TreasureHuntsCollection,
} from "../../types/TreasureHunt.ts";
import { ROUTES } from "../config.ts";
import { getTreasureHunts } from "../services/treasure-hunts.ts";
import getAverageRatings from "../utils/hunts.ts";
import EnrollmentStars from "./EnrollmentStars.tsx";

type HuntsViewModes = "list" | "grid";

export default function HuntsList() {
  const [isLoading, setIsLoading] = useState<boolean>(true),
    [error, setError] = useState<string | null>(null),
    [hunts, setHunts] = useState<TreasureHuntExtended[] | null>(null),
    [viewMode, setViewMode] = useState<HuntsViewModes>("list");

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
        <div className="view-toggle-buttons">
          <button
            type="button"
            className={`toggle-btn ${viewMode === "grid" ? "active" : ""}`}
            onClick={() => {
              setViewMode("grid");
            }}
          >
            {/* Icône Grille SVG */}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <rect x="3" y="3" width="7" height="7" rx="1.5" />
              <rect x="14" y="3" width="7" height="7" rx="1.5" />
              <rect x="3" y="14" width="7" height="7" rx="1.5" />
              <rect x="14" y="14" width="7" height="7" rx="1.5" />
            </svg>
          </button>
          <button
            type="button"
            className={`toggle-btn ${viewMode === "list" ? "active" : ""}`}
            onClick={() => {
              setViewMode("list");
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M4 6h2v2H4zm0 5h2v2H4zm0 5h2v2H4zm5-10h11v2H9zm0 5h11v2H9zm0 5h11v2H9z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Liste / Grille des chasses */}
      <ul
        className={`hunts-list ${viewMode === "grid" ? "view-grid" : "view-list"}`}
      >
        {hunts.map((item: TreasureHuntExtended) => (
          <li key={item.id} className="hunt-card">
            <div className="hunt-card-main">
              <div className="hunt-card-header">
                <h3 className="hunt-title">
                  <Link to={`${ROUTES.HUNTS}/${item.id.toString()}`}>
                    {item.title}
                  </Link>
                </h3>
                <span
                  className={`status-badge ${item.status === "Publiée" ? "published" : "edition"}`}
                >
                  {item.status}
                </span>
              </div>

              <p className="hunt-description">{item.description}</p>
            </div>

            <div className="hunt-card-footer">
              <div className="rating-container">
                <div className="stars">
                  {item.averageRating.toFixed(1) || 0}
                </div>
                <span className="rating-score">
                  <EnrollmentStars averageRating={item.averageRating} />
                </span>
              </div>
              <Link
                to={`${ROUTES.HUNTS}/${item.id.toString()}/reviews`}
                className="reviews-link"
              >
                {item.reviewCount || 0} avis
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
