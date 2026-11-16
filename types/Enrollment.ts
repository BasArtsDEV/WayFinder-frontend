import { type ApiResourceBase } from "./Api";
import type { GameStatus } from "./Game";

export type Enrollment = ApiResourceBase & {
  id: number;
  status: GameStatus;
  scoreTotal: number;
  registrationDate: string;
  countdown: number;
  treasureHunt: string;
  submissions: never;
  riddle?: string;
  team?: string;
  user: string;
  nbStars: number;
  feedback: string;
};

export type EnrollmentsCollection = ApiResourceBase & {
  totalItems: number;
  member: Enrollment[];
};
