import type { ApiResourceBase } from "./Api";

export interface FeedbackUser {
  "@id": string;
  "@type": string;
  username: string;
}

export type Feedback = ApiResourceBase & {
  id: number;
  user: FeedbackUser;
  nbStars: number;
  feedback: string;
};

export type FeedbacksCollection = ApiResourceBase & {
  totalItems: number;
  member: Feedback[];
};
