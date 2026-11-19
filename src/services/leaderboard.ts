import type { Leaderboard } from "../../types/Leaderboard.ts";
import { CONFIG } from "../config.ts";
import { getAuthHeaders, getErrorMessage } from "./api.ts";

/**
 * Returns the leaderboard of a treasure hunt
 */
export default async function getLeaderboard(
  huntId: number,
): Promise<Leaderboard> {
  const response = await fetch(
    `${CONFIG.TREASURE_HUNTS}/${huntId.toString()}/leaderboard`,
    { headers: getAuthHeaders() },
  );

  if (response.status === 404) {
    throw new Error("Cette chasse au trésor n'est pas disponible.");
  }

  if (!response.ok) {
    throw new Error(
      await getErrorMessage(
        response,
        "Une erreur est survenue. Veuillez réessayer plus tard.",
      ),
    );
  }

  return (await response.json()) as Leaderboard;
}
