import type { ApiResourceBase } from "./Api";

export type CreatorTeam = ApiResourceBase & {
  id: number;
  name: string;
  role: string;
  leader: string;
  users: string[];
  treasurehunts: string[];
};
