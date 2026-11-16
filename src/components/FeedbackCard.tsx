import type { Feedback } from "../../types/Feedback.ts";
import { getUserAvatar } from "../services/user.ts";
import EnrollmentStars from "./EnrollmentStars.tsx";

interface FeedbackCardProps {
  enrollment: Feedback;
}

export default function FeedbackCard({ enrollment }: FeedbackCardProps) {
  const userId: string = enrollment.user["@id"].split("/").pop() ?? "";

  return (
    <li className="feedback-card">
      <div className="feedback-card-header">
        <img
          className="feedback-card-avatar"
          src={getUserAvatar(userId)}
          alt=""
        />
        <p className="feedback-card-username">{enrollment.user.username}</p>
        <span
          className="feedback-card-stars"
          role="img"
          aria-label={`${enrollment.nbStars.toString()} étoiles sur 5`}
        >
          <EnrollmentStars averageRating={enrollment.nbStars} />
        </span>
      </div>

      <p className="feedback-card-content">{enrollment.feedback}</p>
    </li>
  );
}
