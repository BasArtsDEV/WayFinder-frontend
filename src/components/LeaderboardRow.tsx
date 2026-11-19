import type { LeaderboardEntry } from "../../types/Leaderboard.ts";
import { getUserAvatar } from "../services/user.ts";

interface LeaderboardRowProps {
  entry: LeaderboardEntry;
}

export default function LeaderboardRow({ entry }: LeaderboardRowProps) {
  return (
    <li
      className={`leaderboard-row${entry.isCurrentUser ? " leaderboard-row-me" : ""}`}
      aria-current={entry.isCurrentUser}
    >
      <span className="leaderboard-rank">
        <span className="visually-hidden">Place </span>
        {entry.rank}
      </span>

      {entry.userId ? (
        <img
          className="leaderboard-avatar"
          src={getUserAvatar(entry.userId.toString())}
          alt=""
        />
      ) : (
        <span className="leaderboard-avatar leaderboard-team-icon">
          <i className="bi bi-people-fill" aria-hidden="true"></i>
        </span>
      )}

      <span className="leaderboard-name">
        {entry.name}
        {entry.isCurrentUser && (
          <span className="visually-hidden"> (vous)</span>
        )}
        {entry.teamId && <span className="leaderboard-tag">Équipe</span>}
        {entry.timedOut && (
          <span className="leaderboard-tag">Temps écoulé</span>
        )}
      </span>

      <span className="leaderboard-score">
        {entry.score}
        <span className="leaderboard-score-unit"> pts</span>
      </span>
    </li>
  );
}
