import { type SubmitEvent, useState } from "react";
import type { RiddleBaseProps } from "../../types/Riddle.ts";
import RiddleFrame from "../components/RiddleFrame.tsx";

interface RiddleTextViewProps extends RiddleBaseProps {
  onSubmit: (answer: string) => void;
  question: string;
}

/**
 * Riddle answered with free text.
 */
function RiddleTextView({
  onSubmit,
  question,
  ...riddle
}: RiddleTextViewProps) {
  const [answer, setAnswer] = useState<string>(""),
    canSubmit = answer.trim().length > 0,
    handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
      event.preventDefault();

      if (canSubmit) {
        onSubmit(answer.trim());
      }
    };

  return (
    <RiddleFrame {...riddle} question={question}>
      <form className="riddle-actions" onSubmit={handleSubmit}>
        <label htmlFor="riddle-answer" className="visually-hidden">
          Votre réponse
        </label>
        <input
          id="riddle-answer"
          name="answer"
          type="text"
          className="input riddle-input"
          placeholder="Votre réponse..."
          autoComplete="off"
          value={answer}
          onChange={(event) => {
            setAnswer(event.target.value);
          }}
        />

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

export default RiddleTextView;
