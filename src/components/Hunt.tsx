import { Link } from "wouter";
import type { TreasureHuntExtended } from "../../types/TreasureHunt.ts";
import { ROUTES } from "../config.ts";
import EnrollmentStars from "./EnrollmentStars.tsx";

interface HuntProps {
  hunt: TreasureHuntExtended;
}

export default function Hunt({ hunt }: HuntProps) {
  return (
    <Link to={`${ROUTES.HUNTS}/${hunt.id.toString()}`}>
      <li className="hunt-card">
        <div className="hunt-card-main">
          <div className="hunt-card-header">
            <h3 className="hunt-title">{hunt.title}</h3>

            <span className={`status-badge published`}>Publiée</span>
          </div>

          <p className="hunt-description">{hunt.description}</p>
        </div>

        <div className="hunt-card-footer">
          <div className="rating-container">
            <div className="stars">{hunt.averageRating.toFixed(1) || 0}</div>

            <span className="rating-score">
              <EnrollmentStars averageRating={hunt.averageRating} />
            </span>
          </div>
        </div>
      </li>
    </Link>
  );
}
