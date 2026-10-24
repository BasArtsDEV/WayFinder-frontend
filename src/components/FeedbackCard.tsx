import "../../public/css/Feedbacks.css";
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
      <div className="feedback-data">
        <div className="feedback-user">
          <img
            className="rounded-circle"
            src={getUserAvatar(userId)}
            alt={`Avatar de ${enrollment.user.username}`}
          />
          <p className="feedback__username">{enrollment.user.username}</p>
        </div>

        <div className="feedback-stars">
          <EnrollmentStars averageRating={enrollment.nbStars} />
        </div>
      </div>

      <p className="feedback__content">{enrollment.feedback}</p>
    </li>
  );
}
