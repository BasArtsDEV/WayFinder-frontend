import type { GameRiddle as GameRiddleData } from "../../types/Game.ts";
import type { RiddleBaseProps } from "../../types/Riddle.ts";
import type { Coordinates } from "../hooks/useGeolocation.ts";
import RiddleGPSView from "../views/RiddleGPSView.tsx";
import RiddleQCMView from "../views/RiddleQCMView.tsx";
import RiddleQRCodeView from "../views/RiddleQRCodeView.tsx";
import RiddleTextView from "../views/RiddleTextView.tsx";

type GameRiddleProps = Omit<
  RiddleBaseProps,
  "description" | "imageUrl" | "title"
> & {
  isLoading: boolean;
  onAnswer: (value: string) => void;
  riddle: GameRiddleData;
};

export default function GameRiddle({
  isLoading,
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
        isLoading={isLoading}
        question={riddle.question ?? ""}
        onSubmit={onAnswer}
      />
    );
  }

  if (riddle.type === "qcm") {
    return (
      <RiddleQCMView
        {...baseProps}
        isLoading={isLoading}
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

  if (riddle.type === "gps") {
    return (
      <RiddleGPSView
        {...baseProps}
        isLoading={isLoading}
        onValidateLocation={({ latitude, longitude }: Coordinates) => {
          onAnswer(JSON.stringify({ latitude, longitude }));
        }}
      />
    );
  }

  return (
    <RiddleQRCodeView {...baseProps} isLoading={isLoading} onScan={onAnswer} />
  );
}
