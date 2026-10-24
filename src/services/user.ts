import { CONFIG } from "../config.ts";

export interface User {
  "@context": string;
  "@id": string;
  "@type": string;
  id: number;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  createdAt: string;
}

/**
 * Returns the URL of the User's avatar
 */
export function getUserAvatar(userId: string): string {
  return `${CONFIG.BASE_URL}/users/${userId}/avatar`;
}

/**
 * Returns an instance of the authenticated User
 */
export async function getMe(): Promise<User> {
  const token = localStorage.getItem("token"),
    headers: HeadersInit = { "Content-Type": "application/ld+json" };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  // eslint-disable-next-line one-var
  const response = await fetch(CONFIG.ME, { headers });

  if (response.status === 401) {
    throw new Error("Identifiants incorrects. Veuillez réessayer.");
  }

  if (!response.ok) {
    throw new Error("Une erreur est survenue. Veuillez réessayer plus tard.");
  }

  return (await response.json()) as User;
}
