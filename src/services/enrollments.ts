import type { FeedbacksCollection } from "../../types/Feedback";
import { CONFIG } from "../config";

/**
 * Returns a Collection of TreasureHunt[]
 * @param huntId The TreasureHunt identifier
 * @returns Promise<FeedbacksCollection>
 */
export default async function getEnrollmentsByTreasureHunt(
  huntId: number,
): Promise<FeedbacksCollection> {
  const headers: HeadersInit = { "Content-Type": "application/ld+json" },
    response = await fetch(
      `${CONFIG.TREASURE_HUNTS}/${huntId.toString()}/enrollments?page=1&hasFeedback=true`,
      {
        headers,
      },
    );

  if (response.status === 404) {
    throw new Error("La chasse fournie n'existe pas");
  }

  if (!response.ok) {
    throw new Error("Une erreur est survenue. Veuillez réessayer plus tard.");
  }

  return (await response.json()) as FeedbacksCollection;
}
