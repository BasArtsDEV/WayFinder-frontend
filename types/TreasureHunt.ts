import type {ApiResourceBase} from "./Api";

/*
  We will give 'Riddle' fields their corresponding type in a future types implementation.
*/
export type TreasureHunt = ApiResourceBase & {
    id: number;
    title: string;
    description: string;
    published: boolean;
    creationDate: string;
    team: string;
    enrollments: string[];
    riddles: never;
    invitationCode: string;
};

export type TreasureHuntExtended = TreasureHunt & {
    averageRating: number;
    status: string;
};

export type TreasureHuntsCollection = ApiResourceBase & {
    totalItems: number;
    member: TreasureHunt[];
};
