import type { Enrollment, EnrollmentsCollection } from "../../types/Enrollment";
import type { FeedbacksCollection } from "../../types/Feedback";
import { CONFIG } from "../config";
import { getAuthHeaders, getErrorMessage } from "./api.ts";

/**
 * Returns the enrollment of a user for a treasure hunt, if any
 * @param userId The User identifier
 * @param huntIri The TreasureHunt IRI
 * @returns Promise<Enrollment | null>
 */
export async function getUserEnrollmentForHunt(
  userId: number,
  huntIri: string,
): Promise<Enrollment | null> {
  const response = await fetch(
    `${CONFIG.USERS}/${userId.toString()}/enrollments`,
    { headers: getAuthHeaders() },
  );

  if (!response.ok) {
    throw new Error(
      await getErrorMessage(
        response,
        "Une erreur est survenue. Veuillez réessayer plus tard.",
      ),
    );
  }

  return (
    ((await response.json()) as EnrollmentsCollection).member.find(
      (enrollment: Enrollment) => enrollment.treasureHunt === huntIri,
    ) ?? null
  );
}

/**
 * Enrolls the authenticated user, alone or with a team, to a treasure hunt
 * @param huntIri The TreasureHunt IRI
 * @param teamIri The Team IRI, for a team game
 * @returns Promise<Enrollment>
 */
export async function createEnrollment(
  huntIri: string,
  teamIri: string | null,
): Promise<Enrollment> {
  const response = await fetch(CONFIG.ENROLLMENTS, {
    body: JSON.stringify({ team: teamIri, treasureHunt: huntIri }),
    headers: getAuthHeaders(),
    method: "POST",
  });

  if (!response.ok) {
    throw new Error(
      await getErrorMessage(
        response,
        "Impossible de rejoindre cette chasse au trésor.",
      ),
    );
  }

  return (await response.json()) as Enrollment;
}

export async function submitReview(
  enrollmentId: number,
  nbStars: number,
  feedback: string,
): Promise<Enrollment> {
  const response = await fetch(
    `${CONFIG.ENROLLMENTS}/${enrollmentId.toString()}`,
    {
      body: JSON.stringify({
        feedback: feedback.trim(),
        nbStars,
      }),
      headers: getAuthHeaders("application/merge-patch+json"),
      method: "PATCH",
    },
  );

  if (!response.ok) {
    throw new Error(
      await getErrorMessage(response, "Impossible d'enregistrer votre avis."),
    );
  }

  return (await response.json()) as Enrollment;
}

/**
 * Returns a Collection of TreasureHunt[]
 * @param huntId The TreasureHunt identifier
 * @returns Promise<FeedbacksCollection>
 */
export default async function getEnrollmentsByTreasureHunt(
  huntId: number,
): Promise<FeedbacksCollection> {
  const token = localStorage.getItem("token"),
    headers: HeadersInit = { "Content-Type": "application/ld+json" };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  // eslint-disable-next-line one-var
  const response = await fetch(
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
