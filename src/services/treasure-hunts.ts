import type {
  TreasureHunt,
  TreasureHuntsCollection,
} from "../../types/TreasureHunt.ts";
import { CONFIG } from "../config.ts";

/**
 * Returns a Collection of TreasureHunt[]
 * @returns Promise<TreasureHuntsCollection>
 */
export async function getTreasureHunts(): Promise<TreasureHuntsCollection> {
  const headers: HeadersInit = { "Content-Type": "application/ld+json" },
    response = await fetch(`${CONFIG.TREASURE_HUNTS}?page=1`, { headers });

  if (!response.ok) {
    throw new Error("Une erreur est survenue. Veuillez réessayer plus tard.");
  }

  return (await response.json()) as TreasureHuntsCollection;
}

/**
 * Returns the TreasureHunt by its identifier
 * @param id The hunt identifier
 * @return Promise<TreasureHunt>
 */
export async function getTreasureHuntById(id: number): Promise<TreasureHunt> {
  const headers: HeadersInit = { "Content-Type": "application/ld+json" },
    response = await fetch(`${CONFIG.TREASURE_HUNTS}/${id.toString()}`, {
      headers,
    });

  if (response.status === 404) {
    throw new Error("La chasse souhaitée n'exite pas.");
  }

  if (!response.ok) {
    throw new Error("Une erreur est survenue. Veuillez réessayer plus tard.");
  }

  return (await response.json()) as TreasureHunt;
}
