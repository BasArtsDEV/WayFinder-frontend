import { ApiResourceBase } from "./Api";

export interface FeedbackUser {
  "@id": string;
  "@type": string;
  username: string;
}

export type Feedback = ApiResourceBase & {
  id: number;
  registrationDate: string;
  user: FeedbackUser;
  nbStars: number;
  feedback: string;
};
