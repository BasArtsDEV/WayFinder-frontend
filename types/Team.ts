import type { ApiResourceBase } from "./Api";

export type CreatorTeam = ApiResourceBase & {
  id: number;
  name: string;
  leader: string;
  users: string[];
  treasurehunts: string[];
};
