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

export interface UserUpdateData {
  email: string;
  firstName: string;
  lastName: string;
  password?: string;
}

interface ConstraintViolationResponse {
  violations?: { message: string }[];
  detail?: string;
}

async function getViolationsMessage(response: Response): Promise<string> {
  const body = (await response.json()) as ConstraintViolationResponse;

  if (body.violations && body.violations.length > 0) {
    return body.violations.map((violation) => violation.message).join("\n");
  }

  return body.detail ?? "Les données saisies sont invalides.";
}

/**
 * Updates the authenticated User and returns the updated instance
 */
export async function updateUser(
  userId: number,
  data: UserUpdateData,
): Promise<User> {
  const token = localStorage.getItem("token") ?? "",
    response = await fetch(`${CONFIG.BASE_URL}/users/${String(userId)}`, {
      body: JSON.stringify(data),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/merge-patch+json",
      },
      method: "PATCH",
    });

  if (response.status === 422) {
    throw new Error(await getViolationsMessage(response));
  }

  if (response.status === 401 || response.status === 403) {
    throw new Error("Vous n'êtes pas autorisé à modifier ce profil.");
  }

  if (!response.ok) {
    throw new Error("Une erreur est survenue. Veuillez réessayer plus tard.");
  }

  return (await response.json()) as User;
}
