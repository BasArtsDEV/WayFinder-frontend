import { Link } from "wouter";
import { ROUTES } from "../config.ts";
import { useLeaderboard } from "../hooks/useLeaderboard.ts";
import LeaderboardRow from "./LeaderboardRow.tsx";
import Loader from "./Loader.tsx";

interface LeaderboardProps {
  huntId: number;
}

export default function Leaderboard({ huntId }: LeaderboardProps) {
  const {
    currentEntry,
    error,
    hasMore,
    isLoading,
    leaderboard,
    showMore,
    total,
    visibleEntries,
  } = useLeaderboard(huntId);

  return (
    <section className="leaderboard" aria-labelledby="leaderboard-title">
      <Link
        href={`~${ROUTES.HUNTS}/${huntId.toString()}`}
        className="leaderboard-back"
      >
        <i className="bi bi-arrow-left" aria-hidden="true"></i>
        Retour à la chasse
      </Link>

      <header className="leaderboard-hero">
        <i
          className="bi bi-trophy-fill leaderboard-hero-icon"
          aria-hidden="true"
        ></i>
        <h1 id="leaderboard-title" className="leaderboard-title">
          Classement
        </h1>
        {leaderboard && (
          <p className="leaderboard-subtitle">
            {leaderboard.treasureHuntTitle}
          </p>
        )}
      </header>

      {isLoading && <Loader label="Chargement du classement..." />}

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {leaderboard && total === 0 && (
        <p className="leaderboard-empty">
          Personne n&apos;a encore terminé cette chasse au trésor.
        </p>
      )}

      {currentEntry && (
        <div className="leaderboard-me">
          <h2 className="leaderboard-section-title">Votre position</h2>
          <ol className="leaderboard-list">
            <LeaderboardRow entry={currentEntry} />
          </ol>
        </div>
      )}

      {visibleEntries.length > 0 && (
        <>
          <h2 className="leaderboard-section-title">
            Participants
            <span className="leaderboard-count">{total}</span>
          </h2>
          <ol
            className="leaderboard-list"
            aria-label="Classement des participants"
          >
            {visibleEntries.map((entry) => (
              <LeaderboardRow
                key={`${entry.teamId ? "team" : "user"}-${(entry.teamId ?? entry.userId ?? 0).toString()}`}
                entry={entry}
              />
            ))}
          </ol>
        </>
      )}

      {hasMore && (
        <button type="button" className="btn-app-secondary" onClick={showMore}>
          <span className="btn-icon-wrapper">
            <i className="bi bi-plus-circle" aria-hidden="true"></i>
          </span>
          <span>Voir plus</span>
        </button>
      )}
    </section>
  );
}
