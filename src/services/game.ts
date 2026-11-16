import type { GameState, GameStatus, Submission } from "../../types/Game.ts";
import { CONFIG } from "../config.ts";
import { getAuthHeaders, getErrorMessage } from "./api.ts";

const DEFAULT_ERROR = "Une erreur est survenue. Veuillez réessayer plus tard.";

/**
 * Returns the game state of an enrollment of the authenticated user
 */
export async function getGameState(enrollmentId: number): Promise<GameState> {
  const response = await fetch(
    `${CONFIG.ENROLLMENTS}/${enrollmentId.toString()}/game`,
    { headers: getAuthHeaders() },
  );

  if (response.status === 404) {
    throw new Error("Cette partie n'existe pas.");
  }

  if (!response.ok) {
    throw new Error(await getErrorMessage(response, DEFAULT_ERROR));
  }

  return (await response.json()) as GameState;
}

/**
 * Starts, resumes or pauses a game
 */
export async function updateGameStatus(
  enrollmentId: number,
  status: GameStatus,
): Promise<void> {
  const response = await fetch(
    `${CONFIG.ENROLLMENTS}/${enrollmentId.toString()}`,
    {
      body: JSON.stringify({ status }),
      headers: getAuthHeaders("application/merge-patch+json"),
      method: "PATCH",
    },
  );

  if (!response.ok) {
    throw new Error(await getErrorMessage(response, DEFAULT_ERROR));
  }
}

/**
 * Submits an answer to the current riddle of a game
 */
export async function submitAnswer(
  enrollmentIri: string,
  riddleIri: string,
  submittedValue: string,
): Promise<Submission> {
  const response = await fetch(CONFIG.SUBMISSIONS, {
    body: JSON.stringify({
      enrollment: enrollmentIri,
      riddle: riddleIri,
      submittedValue,
    }),
    headers: getAuthHeaders(),
    method: "POST",
  });

  if (!response.ok) {
    throw new Error(await getErrorMessage(response, DEFAULT_ERROR));
  }

  return (await response.json()) as Submission;
}
