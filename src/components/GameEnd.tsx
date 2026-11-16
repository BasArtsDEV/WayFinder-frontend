import { Link } from "wouter";
import type { GameState } from "../../types/Game.ts";
import { ROUTES } from "../config.ts";
import { formatRank, formatRemainingTime } from "../utils/riddle.ts";

interface GameEndProps {
  game: GameState;
}

interface GameEndStatProps {
  icon: string;
  label: string;
  value: string;
  wide?: boolean;
}

function GameEndStat({ icon, label, value, wide = false }: GameEndStatProps) {
  return (
    <div className={`riddle-stat${wide ? " riddle-stat--wide" : ""}`}>
      <i className={`bi ${icon} riddle-stat__icon`} aria-hidden="true"></i>
      <div>
        <span className="riddle-stat__label">{label}</span>
        <span className="riddle-stat__value">{value}</span>
      </div>
    </div>
  );
}

export default function GameEnd({ game }: GameEndProps) {
  const isSuccess = !game.timedOut;

  return (
    <section className="game-end" aria-labelledby="game-end-title">
      <div
        className={`game-end-badge ${isSuccess ? "game-end-badge-success" : "game-end-badge-failure"}`}
        aria-hidden="true"
      >
        <i className={isSuccess ? "bi bi-check-lg" : "bi bi-x-lg"}></i>
      </div>

      <h1 id="game-end-title" className="game-end-title">
        {isSuccess ? "Vous avez terminé !" : "Temps écoulé !"}
      </h1>
      <p className="game-end-text">
        {isSuccess
          ? "Félicitations ! Vous avez réussi à résoudre toutes les énigmes."
          : "Vous n'avez pas réussi à résoudre les énigmes à temps. Votre score a été enregistré dans le classement."}
      </p>

      <div className="riddle-stats game-end-stats">
        {isSuccess && (
          <GameEndStat
            icon="bi-clock-fill"
            label="Temps restant"
            value={formatRemainingTime(Math.floor(game.remainingTime / 60))}
            wide
          />
        )}
        <GameEndStat
          icon="bi-star-fill"
          label={game.teamName ? `Score de ${game.teamName}` : "Score"}
          value={game.score.toString()}
          wide={!isSuccess}
        />
        <GameEndStat
          icon="bi-trophy-fill"
          label="Rang"
          value={formatRank(game.rank)}
          wide={!isSuccess}
        />
      </div>

      <div className="game-end-note">
        <h2>Note</h2>
        <p>
          Les résultats ne sont pas définitifs puisque certaines personnes
          n&apos;ont pas encore terminé !
        </p>
      </div>

      <Link href={ROUTES.HOME} className="btn-app-primary game-end-home">
        <span className="btn-icon-wrapper">
          <img src="/icons/home_white.png" className="btn-action-icon" alt="" />
        </span>
        <span>Retourner à l&apos;accueil</span>
      </Link>
    </section>
  );
}
