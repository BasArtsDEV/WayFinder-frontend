import { useLocation } from "wouter";
import { GAME_STATUS, ROUTES } from "../config.ts";
import { updateGameStatus } from "../services/game.ts";

interface GameExitButtonProps {
  enrollmentId: number;
}

export default function GameExitButton({ enrollmentId }: GameExitButtonProps) {
  const [, setLocation] = useLocation(),
    goToHunts = () => {
      setLocation(ROUTES.HUNTS);
    },
    leaveGame = () => {
      updateGameStatus(enrollmentId, GAME_STATUS.PAUSED)
        .then(goToHunts)
        .catch(goToHunts);
    };

  return (
    <button
      type="button"
      className="header-element header-button header-button-exit"
      onClick={leaveGame}
      aria-label="Quitter la partie (elle sera mise en pause)"
      title="Quitter la partie"
    >
      <i className="bi bi-door-open-fill home__icon" aria-hidden="true"></i>
    </button>
  );
}
