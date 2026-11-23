import { useEffect } from "react";
import { useLocation, useParams } from "wouter";
import Game from "../components/Game.tsx";
import Loader from "../components/Loader.tsx";
import Stylesheet from "../components/Stylesheet.tsx";
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
    return <Loader label="Chargement de la partie..." />;
  }

  return (
    <div className="gameview">
      <Stylesheet href="/css/GameView.css" />
      <Stylesheet href="/css/Feedbacks.css" />
      <Stylesheet href="/css/RiddleView.css" />
      <Game enrollmentId={Number(id)} />
    </div>
  );
}

export default GameView;
