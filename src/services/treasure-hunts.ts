import type { TreasureHuntsCollection } from "../../types/TreasureHunt.ts";
import { CONFIG } from "../config.ts";

/**
 * Returns a Collection of TreasureHunt[]
 */
export async function getTreasureHunts(): Promise<TreasureHuntsCollection> {
  const headers: HeadersInit = { "Content-Type": "application/ld+json" },
    response = await fetch(`${CONFIG.TREASURE_HUNTS}?page=1`, { headers });

  if (!response.ok) {
    throw new Error("Une erreur est survenue. Veuillez réessayer plus tard.");
  }

  return (await response.json()) as TreasureHuntsCollection;
}
