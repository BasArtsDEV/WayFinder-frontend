import { type SubmitEvent, useState } from "react";
import type { RiddleBaseProps, RiddleChoice } from "../../types/Riddle.ts";
import RiddleFrame from "../components/RiddleFrame.tsx";

interface RiddleQCMViewProps extends RiddleBaseProps {
  answersCount: number;
  choices: RiddleChoice[];
  onSubmit: (choiceIds: string[]) => void;
  question: string;
}

/**
 * Riddle answered by picking one or several choices (A, B, C, D...).
 */
function RiddleQCMView({
  answersCount,
  choices,
  onSubmit,
  question,
  ...riddle
}: RiddleQCMViewProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]),
    canSubmit = selectedIds.length === answersCount,
    toggleChoice = (choiceId: string) => {
      setSelectedIds((current) => {
        if (current.includes(choiceId)) {
          return current.filter((id) => id !== choiceId);
        }

        // Single answer: picking another choice replaces the previous one
        if (answersCount === 1) {
          return [choiceId];
        }

        // Maximum reached: ignore additional picks
        if (current.length >= answersCount) {
          return current;
        }

        return [...current, choiceId];
      });
    },
    handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
      event.preventDefault();

      if (canSubmit) {
        onSubmit(selectedIds);
      }
    };

  return (
    <RiddleFrame {...riddle} question={question}>
      <form className="riddle-actions" onSubmit={handleSubmit}>
        <p className="riddle-choices-hint" aria-live="polite">
          {answersCount}{" "}
          {answersCount > 1 ? "réponses possibles" : "réponse possible"} (
          {selectedIds.length}/{answersCount} sélectionnée
          {selectedIds.length > 1 ? "s" : ""})
        </p>

        <fieldset className="riddle-choices">
          <legend className="visually-hidden">
            Choisissez {answersCount}{" "}
            {answersCount > 1 ? "réponses" : "réponse"}
          </legend>

          {choices.map((choice, index) => (
            <label key={choice.id} className="riddle-choice">
              <input
                type="checkbox"
                name="riddle-choice"
                className="riddle-choice__input"
                value={choice.id}
                checked={selectedIds.includes(choice.id)}
                onChange={() => {
                  toggleChoice(choice.id);
                }}
              />
              <span className="riddle-choice__radio" aria-hidden="true"></span>
              <span className="riddle-choice__content">
                <span className="riddle-choice__label">
                  Choix {String.fromCharCode(65 + index)}
                </span>
                <span className="riddle-choice__text">{choice.text}</span>
              </span>
            </label>
          ))}
        </fieldset>

        <button
          type="submit"
          className="btn-app-primary riddle-actions__submit"
          disabled={!canSubmit}
        >
          <span className="btn-icon-wrapper">
            <img src="/icons/check.png" className="btn-action-icon" alt="" />
          </span>
          <span>Valider</span>
        </button>
      </form>
    </RiddleFrame>
  );
}

export default RiddleQCMView;
