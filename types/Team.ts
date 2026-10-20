import {ApiResourceBase} from "./Api";

export type Team = ApiResourceBase & {
    id: number;
    name: string;
    leader: string;
    users: string[]
    treasurehunts: string[];
};
