import { type SubmitEvent, useState } from "react";
import type { Enrollment } from "../../types/Enrollment.ts";
import { submitReview } from "../services/enrollments.ts";
import Loader from "./Loader.tsx";

interface ReviewFormProps {
  enrollmentId: number;
  initialFeedback?: string;
  initialStars?: number;
  onSubmitted?: (enrollment: Enrollment) => void;
}

interface StarRatingFieldProps {
  nbStars: number;
  onSelect: (star: number) => void;
}

const STARS = [1, 2, 3, 4, 5];

function getStarLabel(star: number): string {
  return star > 1 ? `${star.toString()} étoiles` : `${star.toString()} étoile`;
}

function getSubmitLabel(isSubmitting: boolean, isEditing: boolean): string {
  if (isSubmitting) {
    return "Enregistrement...";
  }

  return isEditing ? "Mettre à jour mon avis" : "Publier mon avis";
}

function validateReview(nbStars: number, feedback: string): string | null {
  if (nbStars < 1 || nbStars > 5) {
    return "Veuillez sélectionner une note entre 1 et 5 étoiles.";
  }

  if (!feedback.trim()) {
    return "Veuillez saisir un commentaire.";
  }

  return null;
}

function StarRatingField({ nbStars, onSelect }: StarRatingFieldProps) {
  const [hoveredStar, setHoveredStar] = useState<number>(0),
    activeStars = hoveredStar > 0 ? hoveredStar : nbStars;

  return (
    <div className="review-stars-field">
      <span id="review-stars-label" className="review-form-label">
        Note
      </span>
      <div
        className="review-stars"
        role="radiogroup"
        aria-labelledby="review-stars-label"
        onMouseLeave={() => {
          setHoveredStar(0);
        }}
      >
        {STARS.map((star) => (
          <button
            key={star}
            type="button"
            role="radio"
            aria-checked={nbStars === star}
            aria-label={getStarLabel(star)}
            className={`review-star${star <= activeStars ? " review-star-active" : ""}`}
            onClick={() => {
              onSelect(star);
            }}
            onMouseEnter={() => {
              setHoveredStar(star);
            }}
          >
            <i className="bi bi-star-fill" aria-hidden="true"></i>
          </button>
        ))}
      </div>
    </div>
  );
}

export default function ReviewForm({
  enrollmentId,
  initialFeedback = "",
  initialStars = 0,
  onSubmitted,
}: ReviewFormProps) {
  const [nbStars, setNbStars] = useState<number>(initialStars),
    [feedback, setFeedback] = useState<string>(initialFeedback),
    [error, setError] = useState<string | null>(null),
    [success, setSuccess] = useState<string | null>(null),
    [isSubmitting, setIsSubmitting] = useState<boolean>(false),
    [isEditing, setIsEditing] = useState<boolean>(
      initialStars > 0 || initialFeedback.trim().length > 0,
    );

  function handleSubmit(event: SubmitEvent) {
    event.preventDefault();
    const validationError = validateReview(nbStars, feedback);

    setError(validationError);
    setSuccess(null);

    if (validationError) {
      return;
    }

    setIsSubmitting(true);
    submitReview(enrollmentId, nbStars, feedback)
      .then((updated) => {
        setIsEditing(true);
        setSuccess("Votre avis a bien été enregistré !");
        onSubmitted?.(updated);
      })
      .catch((err: unknown) => {
        setError(
          err instanceof Error
            ? err.message
            : "Impossible d'enregistrer votre avis.",
        );
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  }

  return (
    <form className="review-form" onSubmit={handleSubmit}>
      <h3 className="review-form-title">
        {isEditing ? "Modifier votre avis" : "Donner votre avis"}
      </h3>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {success && (
        <div className="alert alert-success" role="status">
          {success}
        </div>
      )}

      <StarRatingField nbStars={nbStars} onSelect={setNbStars} />

      <div className="review-comment-field">
        <label htmlFor="review-feedback" className="review-form-label">
          Commentaire
        </label>
        <textarea
          id="review-feedback"
          className="review-textarea"
          rows={3}
          maxLength={1000}
          placeholder="Partagez votre expérience sur cette chasse au trésor..."
          value={feedback}
          onChange={(event) => {
            setFeedback(event.target.value);
          }}
        />
      </div>

      <button
        type="submit"
        className="btn-app-primary review-submit"
        disabled={isSubmitting}
      >
        <span className="btn-icon-wrapper">
          {isSubmitting ? (
            <Loader isSmall />
          ) : (
            <i className="bi bi-send-fill" aria-hidden="true"></i>
          )}
        </span>
        <span>{getSubmitLabel(isSubmitting, isEditing)}</span>
      </button>
    </form>
  );
}
