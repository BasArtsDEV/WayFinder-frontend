import type { ReactNode } from "react";
import type { RiddleBaseProps } from "../../types/Riddle.ts";
import { formatRank, formatRemainingTime } from "../utils/riddle.ts";

interface RiddleFrameProps extends RiddleBaseProps {
  children: ReactNode;
  question?: string;
}

/**
 * Common layout of every riddle view: step, time / score / rank, riddle card.
 * The part that changes between views (answer field, scan button...) is given as children.
 */
function RiddleFrame({
  children,
  description,
  imageUrl,
  question,
  rank,
  remainingMinutes,
  score,
  step,
  title,
  totalSteps,
}: RiddleFrameProps) {
  return (
    <section className="riddle-view">
      <p className="riddle-step">
        Étape {step} sur {totalSteps}
      </p>

      <div className="riddle-stats">
        <div className="riddle-stat riddle-stat--wide">
          <i
            className="bi bi-clock-fill riddle-stat__icon"
            aria-hidden="true"
          ></i>
          <div>
            <span className="riddle-stat__label">Temps restant</span>
            <span className="riddle-stat__value">
              {formatRemainingTime(remainingMinutes)}
            </span>
          </div>
        </div>

        <div className="riddle-stat">
          <i
            className="bi bi-star-fill riddle-stat__icon"
            aria-hidden="true"
          ></i>
          <div>
            <span className="riddle-stat__label">Score</span>
            <span className="riddle-stat__value">{score}</span>
          </div>
        </div>

        <div className="riddle-stat">
          <i
            className="bi bi-trophy-fill riddle-stat__icon"
            aria-hidden="true"
          ></i>
          <div>
            <span className="riddle-stat__label">Rang</span>
            <span className="riddle-stat__value">{formatRank(rank)}</span>
          </div>
        </div>
      </div>

      <article className="riddle-card">
        <h2 className="riddle-card__title">{title}</h2>
        <p className="riddle-card__description">{description}</p>

        {imageUrl && (
          <div className="riddle-card__media">
            <img
              className="riddle-card__image"
              src={imageUrl}
              alt={`Illustration de l'énigme : ${title}`}
            />
          </div>
        )}

        {question && <p className="riddle-card__question">{question}</p>}
      </article>

      {children}
    </section>
  );
}

export default RiddleFrame;
