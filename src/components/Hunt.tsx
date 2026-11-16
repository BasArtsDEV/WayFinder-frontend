import { Link } from "wouter";
import type { TreasureHunt } from "../../types/TreasureHunt.ts";
import {
  formatHuntDuration,
  formatHuntRating,
  formatRiddlesCount,
} from "../utils/hunt.ts";

interface HuntProps {
  hunt: TreasureHunt;
}

export default function Hunt({ hunt }: HuntProps) {
  return (
    <li className="hunt-card">
      <Link to={`/${hunt.id.toString()}`} className="hunt-card-link">
        <div className="hunt-card-header">
          <h2 className="hunt-card-title">{hunt.title}</h2>
          <i
            className="bi bi-chevron-right hunt-card-arrow"
            aria-hidden="true"
          ></i>
        </div>

        <p className="hunt-card-team">Par {hunt.team.name}</p>
        <p className="hunt-card-description">{hunt.description}</p>

        <div className="hunt-card-meta">
          <span className="hunt-pill">
            <i className="bi bi-puzzle-fill" aria-hidden="true"></i>
            {formatRiddlesCount(hunt)}
          </span>
          <span className="hunt-pill">
            <i className="bi bi-clock-fill" aria-hidden="true"></i>
            {formatHuntDuration(hunt)}
          </span>
          <span className="hunt-pill">
            <i className="bi bi-star-fill" aria-hidden="true"></i>
            {formatHuntRating(hunt)}
          </span>
        </div>
      </Link>
    </li>
  );
}
