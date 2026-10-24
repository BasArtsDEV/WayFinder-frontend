import type { ApiResourceBase } from "./Api";
import type { CreatorTeam } from "./Team";

/*
  We will give 'Riddle' fields their corresponding type in a future types implementation.
*/
export type TreasureHunt = ApiResourceBase & {
  id: number;
  title: string;
  description: string;
  published: boolean;
  creationDate: string;
  team: CreatorTeam;
  enrollments: string[];
  riddles: object[];
  invitationCode: string;
  averageStars?: number;
};

export type TreasureHuntsCollection = ApiResourceBase & {
  totalItems: number;
  member: TreasureHunt[];
};
