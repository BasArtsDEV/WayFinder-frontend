import { type SubmitEvent, useState } from "react";
import type { RiddleBaseProps, RiddleChoice } from "../../types/Riddle.ts";
import RiddleFrame from "../components/RiddleFrame.tsx";

interface RiddleQCMViewProps extends RiddleBaseProps {
  choices: RiddleChoice[];
  onSubmit: (choiceId: string) => void;
  question: string;
}

/**
 * Riddle answered by picking one choice (A, B, C, D...).
 */
function RiddleQCMView({
  choices,
  onSubmit,
  question,
  ...riddle
}: RiddleQCMViewProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null),
    handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
      event.preventDefault();

      if (selectedId !== null) {
        onSubmit(selectedId);
      }
    };

  return (
    <RiddleFrame {...riddle} question={question}>
      <form className="riddle-actions" onSubmit={handleSubmit}>
        <fieldset className="riddle-choices">
          <legend className="visually-hidden">Choisissez une réponse</legend>

          {choices.map((choice, index) => (
            <label key={choice.id} className="riddle-choice">
              <input
                type="radio"
                name="riddle-choice"
                className="riddle-choice__input"
                value={choice.id}
                checked={selectedId === choice.id}
                onChange={() => {
                  setSelectedId(choice.id);
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
          disabled={selectedId === null}
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
