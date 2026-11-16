import type { CreatorTeam } from "../../types/Team.ts";
import { CONFIG } from "../config.ts";
import { getAuthHeaders } from "./api.ts";

interface TeamsCollection {
  member: CreatorTeam[];
}

/**
 * Returns the participant teams of a user
 * @param userId The User identifier
 * @returns Promise<CreatorTeam[]>
 */
export async function getUserParticipantTeams(
  userId: number,
): Promise<CreatorTeam[]> {
  const response = await fetch(`${CONFIG.USERS}/${userId.toString()}/teams`, {
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    throw new Error("Impossible de récupérer vos équipes.");
  }

  return ((await response.json()) as TeamsCollection).member.filter(
    (team: CreatorTeam) => team.role === "participant",
  );
}
