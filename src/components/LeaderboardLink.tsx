import { Link } from "wouter";
import { ROUTES } from "../config.ts";

interface LeaderboardLinkProps {
  huntId: number;
}

export default function LeaderboardLink({ huntId }: LeaderboardLinkProps) {
  return (
    <Link
      href={`~${ROUTES.HUNTS}/${huntId.toString()}${ROUTES.LEADERBOARD}`}
      className="btn-app-secondary"
    >
      <span className="btn-icon-wrapper">
        <i className="bi bi-trophy-fill" aria-hidden="true"></i>
      </span>
      <span>Voir le classement</span>
    </Link>
  );
}
