import { useEffect, useState } from "react";
import type { Feedback, FeedbacksCollection } from "../../types/Feedback.ts";
import getEnrollmentsByTreasureHunt from "../services/enrollments.ts";
import FeedbackCard from "./FeedbackCard.tsx";

interface FeedbacksListProps {
  huntId: number;
}

export default function FeedbacksList({ huntId }: FeedbacksListProps) {
  const [feedbacks, setFeedbacks] = useState<Feedback[] | null>(null),
    [error, setError] = useState<string | null>(null),
    [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    getEnrollmentsByTreasureHunt(huntId)
      .then((data: FeedbacksCollection) => {
        setFeedbacks(data.member);
      })
      .catch((err: unknown) => {
        setFeedbacks(null);
        setError(
          err instanceof Error
            ? err.message
            : "Une erreur est survenue. Veuillez réessayer plus tard.",
        );
      });
  }, [huntId]);

  if (error) {
    return <div style={{ color: "red" }}>Erreur : {error}</div>;
  }

  if (!feedbacks) {
    return null;
  }

  return (
    <>
      <div style={{ paddingLeft: "2rem" }}>
        {feedbacks.length ? (
          <button
            className="feedback-toggle-btn"
            onClick={() => {
              setIsOpen(!isOpen);
            }}
          >
            <span className="feedback__count">{feedbacks.length} avis</span>

            {isOpen ? (
              <i className="bi bi-arrow-down"></i>
            ) : (
              <i className="bi bi-arrow-up"></i>
            )}
          </button>
        ) : (
          <span className="feedback__count">Aucun avis</span>
        )}
      </div>

      <ul className={`feedbacks-list${isOpen ? " is-open" : ""}`}>
        {feedbacks.map((item: Feedback, index: number) => (
          <FeedbackCard key={index} enrollment={item} />
        ))}
      </ul>
    </>
  );
}
