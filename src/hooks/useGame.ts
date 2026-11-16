import { useCallback, useEffect, useRef, useState } from "react";
import type { GameState } from "../../types/Game.ts";
import {
  getGameState,
  submitAnswer,
  updateGameStatus,
} from "../services/game.ts";

const DEFAULT_ERROR = "Une erreur est survenue. Veuillez réessayer plus tard.";

function getMessage(err: unknown): string {
  return err instanceof Error ? err.message : DEFAULT_ERROR;
}

async function loadAndStartGame(enrollmentId: number): Promise<GameState> {
  const game = await getGameState(enrollmentId);

  if (game.status === "not_started" || game.status === "paused") {
    await updateGameStatus(enrollmentId, "in_progress");
    return getGameState(enrollmentId);
  }

  return game;
}

export function useGame(enrollmentId: number) {
  const [game, setGame] = useState<GameState | null>(null),
    [error, setError] = useState<string | null>(null),
    [feedback, setFeedback] = useState<string | null>(null),
    [remainingTime, setRemainingTime] = useState<number>(0),
    isSubmitting = useRef<boolean>(false),
    applyGame = useCallback((state: GameState) => {
      setGame(state);
      setRemainingTime(state.remainingTime);
    }, []),
    refresh = useCallback(async () => {
      applyGame(await getGameState(enrollmentId));
    }, [enrollmentId, applyGame]);

  useEffect(() => {
    loadAndStartGame(enrollmentId)
      .then(applyGame)
      .catch((err: unknown) => {
        setError(getMessage(err));
      });
  }, [enrollmentId, applyGame]);

  useEffect(() => {
    const isRunning = game?.status === "in_progress",
      interval = setInterval(() => {
        if (isRunning) {
          setRemainingTime((current) => Math.max(0, current - 1));
        }
      }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [game]);

  useEffect(() => {
    if (game?.status === "in_progress" && remainingTime === 0) {
      refresh().catch((err: unknown) => {
        setError(getMessage(err));
      });
    }
  }, [game, remainingTime, refresh]);

  function answer(value: string) {
    if (!game?.riddle || isSubmitting.current) {
      return;
    }

    isSubmitting.current = true;
    setFeedback(null);

    submitAnswer(game.enrollment, game.riddle.iri, value)
      .then((submission) => {
        if (!submission.isRight) {
          setFeedback(
            `Mauvaise réponse ! ${submission.appliedPenalty.toString()} secondes de pénalité.`,
          );
        }
      })
      .catch((err: unknown) => {
        setFeedback(getMessage(err));
      })
      .finally(() => {
        isSubmitting.current = false;
        refresh().catch((err: unknown) => {
          setError(getMessage(err));
        });
      });
  }

  return { answer, error, feedback, game, remainingTime };
}
