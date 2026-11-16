import type { GameRiddle as GameRiddleData } from "../../types/Game.ts";
import type { RiddleBaseProps } from "../../types/Riddle.ts";
import RiddleQCMView from "../views/RiddleQCMView.tsx";
import RiddleTextView from "../views/RiddleTextView.tsx";
import RiddleFrame from "./RiddleFrame.tsx";

type GameRiddleProps = Omit<
  RiddleBaseProps,
  "description" | "imageUrl" | "title"
> & {
  onAnswer: (value: string) => void;
  riddle: GameRiddleData;
};

export default function GameRiddle({
  onAnswer,
  riddle,
  ...stats
}: GameRiddleProps) {
  const baseProps: RiddleBaseProps = {
    ...stats,
    description: riddle.description,
    imageUrl: riddle.image,
    title: riddle.title,
  };

  if (riddle.type === "text") {
    return (
      <RiddleTextView
        {...baseProps}
        question={riddle.question ?? ""}
        onSubmit={onAnswer}
      />
    );
  }

  if (riddle.type === "qcm") {
    return (
      <RiddleQCMView
        {...baseProps}
        question={riddle.question ?? ""}
        answersCount={riddle.answersCount}
        choices={riddle.choices.map((choice) => ({
          id: choice.id.toString(),
          text: choice.label,
        }))}
        onSubmit={(choiceIds: string[]) => {
          onAnswer(JSON.stringify(choiceIds.map(Number)));
        }}
      />
    );
  }

  return (
    <RiddleFrame {...baseProps}>
      <p className="riddle-instruction" role="status">
        Ce type d&apos;énigme n&apos;est pas encore disponible dans
        l&apos;application.
      </p>
    </RiddleFrame>
  );
}
