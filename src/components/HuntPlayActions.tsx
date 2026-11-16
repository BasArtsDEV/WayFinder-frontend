import { Link } from "wouter";
import type { Enrollment } from "../../types/Enrollment.ts";
import type { TreasureHunt } from "../../types/TreasureHunt.ts";
import { ROUTES } from "../config.ts";
import { useHuntPlay } from "../hooks/useHuntPlay.ts";

interface HuntPlayActionsProps {
  hunt: TreasureHunt;
}

function getEnrollmentLabel(status: Enrollment["status"]): string {
  if (status === "finished") {
    return "Voir mes résultats";
  }

  return status === "not_started"
    ? "Commencer la partie"
    : "Reprendre la partie";
}

export default function HuntPlayActions({ hunt }: HuntPlayActionsProps) {
  const {
    enrollment,
    error,
    isLoading,
    play,
    setTeamIri,
    teamIri,
    teams,
    user,
  } = useHuntPlay(hunt);

  if (!user) {
    return (
      <div className="hunt-play">
        <Link href={`~${ROUTES.LOGIN}`} className="btn-app-primary">
          <i className="bi bi-box-arrow-in-right" aria-hidden="true"></i>
          <span>Se connecter pour jouer</span>
        </Link>
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
          <i className="bi bi-play-circle-fill" aria-hidden="true"></i>
          <span>{getEnrollmentLabel(enrollment.status)}</span>
        </Link>
      </div>
    );
  }

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
        value={teamIri}
        onChange={(event) => {
          setTeamIri(event.target.value);
        }}
      >
        <option value="">Seul</option>
        {teams.map((team) => (
          <option key={team["@id"]} value={team["@id"]}>
            En équipe : {team.name}
          </option>
        ))}
      </select>

      <button
        type="button"
        className="btn-app-primary"
        onClick={play}
        disabled={isLoading}
      >
        <i className="bi bi-play-circle-fill" aria-hidden="true"></i>
        <span>{isLoading ? "Chargement..." : "Jouer"}</span>
      </button>
    </div>
  );
}
