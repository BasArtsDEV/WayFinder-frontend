import { useEffect } from "react";
import { useLocation, useParams } from "wouter";
import Game from "../components/Game.tsx";
import { ROUTES } from "../config.ts";
import { useAuth } from "../contexts/AuthContext.ts";

function GameView() {
  const { isLoading, user } = useAuth(),
    { id } = useParams(),
    [, setLocation] = useLocation();

  useEffect(() => {
    if (!isLoading && !user) {
      setLocation(ROUTES.LOGIN);
    }
  }, [isLoading, user]);

  if (isLoading || !user || !id) {
    return <div className="game-message">Chargement de la partie...</div>;
  }

  return (
    <div className="gameview">
      <Game enrollmentId={Number(id)} />
    </div>
  );
}

export default GameView;
