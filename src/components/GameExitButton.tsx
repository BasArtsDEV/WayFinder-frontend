import { useState } from "react";
import { useLocation } from "wouter";
import { GAME_STATUS, ROUTES } from "../config.ts";
import { updateGameStatus } from "../services/game.ts";
import Loader from "./Loader.tsx";

interface GameExitButtonProps {
  enrollmentId: number;
}

export default function GameExitButton({ enrollmentId }: GameExitButtonProps) {
  const [, setLocation] = useLocation(),
    [isLeaving, setIsLeaving] = useState<boolean>(false),
    goToHunts = () => {
      setLocation(ROUTES.HUNTS);
    },
    leaveGame = () => {
      setIsLeaving(true);
      updateGameStatus(enrollmentId, GAME_STATUS.PAUSED)
        .then(goToHunts)
        .catch(goToHunts);
    };

  return (
    <button
      type="button"
      className="header-element header-button header-button-exit"
      onClick={leaveGame}
      disabled={isLeaving}
      aria-label="Quitter la partie (elle sera mise en pause)"
      title="Quitter la partie"
    >
      {isLeaving ? (
        <span className="home__icon">
          <Loader isSmall label="Sortie de la partie..." />
        </span>
      ) : (
        <i className="bi bi-door-open-fill home__icon" aria-hidden="true"></i>
      )}
    </button>
  );
}
