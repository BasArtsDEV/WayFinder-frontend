import type { ApiResourceBase } from "./Api";

export type GameRiddleType = "text" | "qcm" | "gps" | "qrcode";

export type GameStatus = "not_started" | "paused" | "in_progress" | "finished";

export interface GameChoice {
  id: number;
  label: string;
}

export interface GameRiddle {
  iri: string;
  type: GameRiddleType;
  title: string;
  description: string;
  image?: string;
  imgDescription?: string;
  question?: string;
  secondsPenalty: number;
  answersCount: number;
  choices: GameChoice[];
}

export type GameState = ApiResourceBase & {
  id: number;
  enrollment: string;
  status: GameStatus;
  timedOut: boolean;
  treasureHuntId: number;
  treasureHuntTitle: string;
  teamName?: string;
  step: number;
  totalSteps: number;
  duration: number;
  elapsedTime: number;
  remainingTime: number;
  score: number;
  rank: number;
  competitorsCount: number;
  riddle?: GameRiddle;
};

export type Submission = ApiResourceBase & {
  id: number;
  submittedValue: string;
  isRight: boolean;
  appliedPenalty: number;
  resolutionTime: number;
};
