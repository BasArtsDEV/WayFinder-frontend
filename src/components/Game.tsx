import { GAME_STATUS } from "../config.ts";
import { useGame } from "../hooks/useGame.ts";
import GameEnd from "./GameEnd.tsx";
import GameRiddle from "./GameRiddle.tsx";
import Loader from "./Loader.tsx";

interface GameProps {
  enrollmentId: number;
}

export default function Game({ enrollmentId }: GameProps) {
  const { answer, error, feedback, game, isAnswering, remainingTime } =
    useGame(enrollmentId);

  if (error) {
    return (
      <div className="game-message alert alert-danger" role="alert">
        {error}
      </div>
    );
  }

  if (!game) {
    return <Loader label="Chargement de la partie..." />;
  }

  if (game.status === GAME_STATUS.FINISHED || !game.riddle) {
    return <GameEnd game={game} />;
  }

  return (
    <div className="game">
      {feedback && (
        <div className="game-feedback alert alert-warning" role="alert">
          {feedback}
        </div>
      )}

      <GameRiddle
        key={game.riddle.iri}
        riddle={game.riddle}
        isLoading={isAnswering}
        onAnswer={answer}
        rank={game.rank}
        remainingMinutes={Math.ceil(remainingTime / 60)}
        score={game.score}
        step={game.step}
        totalSteps={game.totalSteps}
      />
    </div>
  );
}
