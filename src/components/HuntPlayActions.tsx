import { Link } from "wouter";
import type { GameStatus } from "../../types/Game.ts";
import type { TreasureHunt } from "../../types/TreasureHunt.ts";
import { GAME_STATUS, ROUTES } from "../config.ts";
import { type PlayMode, useHuntPlay } from "../hooks/useHuntPlay.ts";
import LeaderboardLink from "./LeaderboardLink.tsx";
import Loader from "./Loader.tsx";

interface HuntPlayActionsProps {
  hunt: TreasureHunt;
}

function getEnrollmentLabel(status: GameStatus): string {
  return status === GAME_STATUS.NOT_STARTED
    ? "Commencer la partie"
    : "Reprendre la partie";
}

// eslint-disable-next-line max-lines-per-function
export default function HuntPlayActions({ hunt }: HuntPlayActionsProps) {
  const {
    enrollment,
    error,
    handleModeChange,
    isLoading,
    play,
    playMode,
    setTeamIri,
    teamIri,
    teams,
    user,
  } = useHuntPlay(hunt);

  if (!user) {
    return (
      <div className="hunt-play">
        <Link href={`~${ROUTES.LOGIN}`} className="btn-app-primary">
          <span className="btn-icon-wrapper">
            <i className="bi bi-box-arrow-in-right" aria-hidden="true"></i>
          </span>
          <span>Se connecter pour jouer</span>
        </Link>
        <LeaderboardLink huntId={hunt.id} />
      </div>
    );
  }

  if (enrollment?.status === GAME_STATUS.FINISHED) {
    return (
      <div className="hunt-play">
        <p className="hunt-play-done">
          <i className="bi bi-check-circle-fill" aria-hidden="true"></i>
          Vous avez déjà participé à cette chasse au trésor.
        </p>
        <LeaderboardLink huntId={hunt.id} />
      </div>
    );
  }

  if (enrollment) {
    return (
      <div className="hunt-play">
        <Link
          href={`~${ROUTES.GAME}/${enrollment.id.toString()}`}
          className="btn-app-primary"
        >
          <span className="btn-icon-wrapper">
            <i className="bi bi-play-circle-fill" aria-hidden="true"></i>
          </span>
          <span>{getEnrollmentLabel(enrollment.status)}</span>
        </Link>
        <LeaderboardLink huntId={hunt.id} />
      </div>
    );
  }

  // eslint-disable-next-line one-var
  const canPlay =
    playMode === "solo" ||
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    (playMode === "team" && teams.length > 0 && teamIri !== "");

  return (
    <div className="hunt-play">
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      <label htmlFor="hunt-play-mode" className="hunt-play-label">
        Mode de jeu
      </label>
      <select
        id="hunt-play-mode"
        className="input hunt-play-select"
        value={playMode}
        onChange={(event) => {
          handleModeChange(event.target.value as PlayMode);
        }}
      >
        <option value="solo">Jouer seul</option>
        <option value="team">Jouer en équipe</option>
      </select>

      {playMode === "team" && (
        <div className="hunt-play-team-section">
          {teams.length > 0 && (
            <>
              <label htmlFor="hunt-play-team" className="hunt-play-label">
                Choisir une équipe
              </label>
              <select
                id="hunt-play-team"
                className="input hunt-play-select"
                value={teamIri}
                onChange={(event) => {
                  setTeamIri(event.target.value);
                }}
              >
                {teams.map((team) => (
                  <option key={team["@id"]} value={team["@id"]}>
                    {team.name}
                  </option>
                ))}
              </select>
            </>
          )}

          <Link
            href={`~${ROUTES.TEAMS}/new`}
            className="btn-app-secondary mt-3"
          >
            <span className="btn-icon-wrapper">
              <i className="bi bi-plus-circle" aria-hidden="true"></i>
            </span>
            <span>Créer une équipe</span>
          </Link>
        </div>
      )}

      {canPlay && (
        <button
          type="button"
          className="btn-app-primary"
          onClick={play}
          disabled={isLoading}
        >
          <span className="btn-icon-wrapper">
            {isLoading ? (
              <Loader isSmall />
            ) : (
              <i className="bi bi-play-circle-fill" aria-hidden="true"></i>
            )}
          </span>
          <span>{isLoading ? "Chargement..." : "Jouer"}</span>
        </button>
      )}

      <LeaderboardLink huntId={hunt.id} />
    </div>
  );
}
