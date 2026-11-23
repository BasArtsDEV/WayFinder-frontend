import { useCallback, useEffect, useRef, useState } from "react";
import type { GameState } from "../../types/Game.ts";
import { GAME_STATUS } from "../config.ts";
import {
  getGameState,
  submitAnswer,
  updateGameStatus,
} from "../services/game.ts";
import { getTreasureHuntById } from "../services/treasure-hunts.ts";

const DEFAULT_ERROR = "Une erreur est survenue. Veuillez réessayer plus tard.";

function getMessage(err: unknown): string {
  return err instanceof Error ? err.message : DEFAULT_ERROR;
}

async function startGame(
  enrollmentId: number,
  game: GameState,
): Promise<GameState> {
  if (
    game.status === GAME_STATUS.NOT_STARTED ||
    game.status === GAME_STATUS.PAUSED
  ) {
    await updateGameStatus(enrollmentId, GAME_STATUS.IN_PROGRESS);
    return getGameState(enrollmentId);
  }

  return game;
}

async function loadAndStartGame(enrollmentId: number): Promise<GameState> {
  const game = await getGameState(enrollmentId);

  await getTreasureHuntById(game.treasureHuntId);

  return startGame(enrollmentId, game);
}

export function useGame(enrollmentId: number) {
  const [game, setGame] = useState<GameState | null>(null),
    [error, setError] = useState<string | null>(null),
    [feedback, setFeedback] = useState<string | null>(null),
    [remainingTime, setRemainingTime] = useState<number>(0),
    [isAnswering, setIsAnswering] = useState<boolean>(false),
    isSubmitting = useRef<boolean>(false),
    applyGame = useCallback((state: GameState) => {
      setGame(state);
      setRemainingTime(state.remainingTime);
    }, []),
    refresh = useCallback(async () => {
      const state = await getGameState(enrollmentId);

      if (state.status === GAME_STATUS.NOT_STARTED) {
        setFeedback(
          "Votre partie a été réinitialisée par l'organisateur de la chasse.",
        );
      }

      applyGame(await startGame(enrollmentId, state));
    }, [enrollmentId, applyGame]);

  useEffect(() => {
    loadAndStartGame(enrollmentId)
      .then(applyGame)
      .catch((err: unknown) => {
        setError(getMessage(err));
      });
  }, [enrollmentId, applyGame]);

  useEffect(() => {
    const isRunning = game?.status === GAME_STATUS.IN_PROGRESS,
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
    if (game?.status === GAME_STATUS.IN_PROGRESS && remainingTime === 0) {
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
    setIsAnswering(true);
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
        refresh()
          .catch((err: unknown) => {
            setError(getMessage(err));
          })
          .finally(() => {
            setIsAnswering(false);
          });
      });
  }

  return { answer, error, feedback, game, isAnswering, remainingTime };
}
