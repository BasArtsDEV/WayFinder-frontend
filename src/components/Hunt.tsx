import { Link } from "wouter";
import type { TreasureHunt } from "../../types/TreasureHunt.ts";
import EnrollmentStars from "./EnrollmentStars.tsx";

interface HuntProps {
  hunt: TreasureHunt;
}

export default function Hunt({ hunt }: HuntProps) {
  return (
    <Link to={`/${hunt.id.toString()}`}>
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
            {hunt.averageStars && (
              <>
                <div className="stars">{hunt.averageStars.toFixed(1)}</div>
                <span className="rating-score">
                  <EnrollmentStars averageRating={hunt.averageStars} />
                </span>
              </>
            )}
          </div>

          <span>
            {hunt.enrollments.length} avis
            <i className="bi bi-arrow-right-short"></i>
          </span>
        </div>
      </li>
    </Link>
  );
}
