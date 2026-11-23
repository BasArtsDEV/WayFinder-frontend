import { useState } from "react";
import type { Feedback } from "../../types/Feedback.ts";
import { GAME_STATUS } from "../config.ts";
import { useFeedbacks } from "../hooks/useFeedbacks.ts";
import FeedbackCard from "./FeedbackCard.tsx";
import Loader from "./Loader.tsx";
import ReviewForm from "./ReviewForm.tsx";

interface FeedbacksListProps {
  huntId: number;
  huntIri?: string;
}

const PREVIEW_COUNT = 3;

export default function FeedbacksList({ huntId, huntIri }: FeedbacksListProps) {
  const { error, feedbacks, handleReviewSubmitted, isLoading, userEnrollment } =
      useFeedbacks(huntId, huntIri),
    [isExpanded, setIsExpanded] = useState<boolean>(false),
    visibleFeedbacks = isExpanded
      ? feedbacks
      : feedbacks.slice(0, PREVIEW_COUNT);

  return (
    <section className="feedbacks" aria-labelledby="feedbacks-title">
      <h2 id="feedbacks-title" className="feedbacks-title">
        Avis des joueurs
        <span className="feedbacks-count">{feedbacks.length}</span>
      </h2>

      {userEnrollment?.status === GAME_STATUS.FINISHED && (
        <ReviewForm
          enrollmentId={userEnrollment.id}
          initialStars={userEnrollment.nbStars}
          initialFeedback={userEnrollment.feedback}
          onSubmitted={handleReviewSubmitted}
        />
      )}

      {isLoading && <Loader label="Chargement des avis..." />}

      {error && <p className="feedbacks-empty">{error}</p>}

      {!isLoading && !error && !feedbacks.length && (
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
