import { useEffect, useState } from "react";
import type { Feedback, FeedbacksCollection } from "../../types/Feedback.ts";
import getEnrollmentsByTreasureHunt from "../services/enrollments.ts";
import FeedbackCard from "./FeedbackCard.tsx";

interface FeedbacksListProps {
  huntId: number;
}

const PREVIEW_COUNT = 3;

export default function FeedbacksList({ huntId }: FeedbacksListProps) {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]),
    [error, setError] = useState<string | null>(null),
    [isExpanded, setIsExpanded] = useState<boolean>(false),
    visibleFeedbacks = isExpanded
      ? feedbacks
      : feedbacks.slice(0, PREVIEW_COUNT);

  useEffect(() => {
    getEnrollmentsByTreasureHunt(huntId)
      .then((data: FeedbacksCollection) => {
        setFeedbacks(data.member);
      })
      .catch((err: unknown) => {
        setError(
          err instanceof Error
            ? err.message
            : "Impossible de charger les avis pour le moment.",
        );
      });
  }, [huntId]);

  return (
    <section className="feedbacks" aria-labelledby="feedbacks-title">
      <h2 id="feedbacks-title" className="feedbacks-title">
        Avis des joueurs
        <span className="feedbacks-count">{feedbacks.length}</span>
      </h2>

      {error && <p className="feedbacks-empty">{error}</p>}

      {!error && !feedbacks.length && (
        <p className="feedbacks-empty">Aucun avis pour le moment.</p>
      )}

      <ul className="feedbacks-list" id="feedbacks-list">
        {visibleFeedbacks.map((feedback: Feedback) => (
          <FeedbackCard key={feedback.id} enrollment={feedback} />
        ))}
      </ul>

      {feedbacks.length > PREVIEW_COUNT && (
        <button
          type="button"
          className="btn-app-secondary feedbacks-toggle"
          aria-expanded={isExpanded}
          aria-controls="feedbacks-list"
          onClick={() => {
            setIsExpanded(!isExpanded);
          }}
        >
          <span className="btn-icon-wrapper">
            <i
              className={isExpanded ? "bi bi-chevron-up" : "bi bi-chevron-down"}
              aria-hidden="true"
            ></i>
          </span>
          <span>
            {isExpanded
              ? "Voir moins d'avis"
              : `Voir les ${feedbacks.length.toString()} avis`}
          </span>
        </button>
      )}
    </section>
  );
}
