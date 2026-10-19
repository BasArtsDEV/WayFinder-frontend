import {ApiResourceBase} from "./Api";

export type Enrollment = ApiResourceBase & {
    id: number;
    status: string;
    scoreTotal: number;
    registrationDate: string;
    countdown: number;
    treasureHunt: string;
    submissions: never;
    user: string;
    nbStars: number;
    feedback: string;
};

export type EnrollmentsCollection = ApiResourceBase & {
    totalItems: number;
    member: Enrollment[];
};
