import type { ApiResourceBase } from "./Api";

export interface LeaderboardEntry {
  rank: number;
  name: string;
  userId?: number;
  teamId?: number;
  score: number;
  timedOut: boolean;
  isCurrentUser: boolean;
}

export type Leaderboard = ApiResourceBase & {
  id: number;
  treasureHuntTitle: string;
  entries: LeaderboardEntry[];
};
