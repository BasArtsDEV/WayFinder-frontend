import type { Enrollment } from "../../types/Enrollment.ts";
import { CONFIG } from "../config.ts";

export default async function getAverageRatings(
  enrollmentsEndpoints: string[],
): Promise<number> {
  if (!enrollmentsEndpoints.length) return 0.0;

  const token = localStorage.getItem("token"),
    headers: HeadersInit = { "Content-Type": "application/ld+json" };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  // eslint-disable-next-line one-var
  const enrollments = await Promise.all(
      enrollmentsEndpoints.map(async (endpoint: string) => {
        const id: string = endpoint.split("/").pop() ?? "",
          response = await fetch(`${CONFIG.ENROLLMENTS}/${id}`, { headers });

        if (!response.ok) {
          throw new Error(
            "Une erreur est survenue lors de la récupération des inscriptions.",
          );
        }

        return (await response.json()) as Enrollment;
      }),
    ),
    totalStars: number = enrollments.reduce(
      (acc: number, enrollment: Enrollment) => acc + (enrollment.nbStars || 0),
      0,
    );

  return totalStars / enrollments.length;
}
