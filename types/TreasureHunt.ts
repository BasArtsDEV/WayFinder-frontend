import {ApiResourceBase} from "./Api";

/*
  We will give 'enrollments' and 'riddles' fields their corresponding type in a future types implementation.
*/
export type TreasureHunt = ApiResourceBase & {
  id: number;
  title: string;
  description: string;
  published: boolean;
  creationDate: string;
  team: string;
  enrollments: never;
  riddles: never;
  invitationCode: string;
};

export type TreasureHuntsCollection = ApiResourceBase & {
  totalItems: number;
  member: TreasureHunt[];
};