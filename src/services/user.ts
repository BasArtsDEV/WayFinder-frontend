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
  isVerified: boolean;
  timezone: string;
  hasAvatar?: boolean;
  hasBanner?: boolean;

  /** timestamp used to bypass the browser cache after an update */
  avatarVersion?: number;
  bannerVersion?: number;
}

function withVersion(url: string, version?: number): string {
  // eslint-disable-next-line no-undefined
  return version === undefined ? url : `${url}?v=${String(version)}`;
}

/**
 * Returns the URL of the User's avatar
 */
export function getUserAvatar(userId: string, version?: number): string {
  return withVersion(`${CONFIG.BASE_URL}/users/${userId}/avatar`, version);
}

/**
 * Returns the URL of the User's banner
 */
export function getUserBanner(userId: string, version?: number): string {
  return withVersion(`${CONFIG.BASE_URL}/users/${userId}/banner`, version);
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
  timezone: string;
  username: string;
}

interface ConstraintViolationResponse {
  violations?: { message: string }[];
  detail?: string;
}

async function getViolationsMessage(response: Response): Promise<string> {
  const body = (await response.json()) as ConstraintViolationResponse;

  if (body.violations?.length) {
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

export type UserImageKind = "avatar" | "banner";

const IMAGE_ERRORS: Record<number, string> = {
  401: "Vous n'êtes pas autorisé à modifier cette image.",
  403: "Vous n'êtes pas autorisé à modifier cette image.",
  413: "L'image est trop volumineuse.",
};

async function getImageErrorMessage(response: Response): Promise<string> {
  if (response.status === 422) {
    return getViolationsMessage(response);
  }

  return (
    IMAGE_ERRORS[response.status] ??
    "Une erreur est survenue. Veuillez réessayer plus tard."
  );
}

/**
 * Uploads a new avatar or banner for the authenticated User
 */
export async function uploadUserImage(
  userId: number,
  kind: UserImageKind,
  file: File,
): Promise<User> {
  const body = new FormData(),
    token = localStorage.getItem("token") ?? "";

  body.append(kind, file);

  // eslint-disable-next-line one-var
  const response = await fetch(
    `${CONFIG.BASE_URL}/users/${String(userId)}/${kind}`,
    {
      body,
      headers: { Authorization: `Bearer ${token}` },
      method: "POST",
    },
  );

  if (!response.ok) {
    throw new Error(await getImageErrorMessage(response));
  }

  return (await response.json()) as User;
}

/**
 * Removes the avatar or banner of the authenticated User
 */
export async function deleteUserImage(
  userId: number,
  kind: UserImageKind,
): Promise<void> {
  const token = localStorage.getItem("token") ?? "",
    response = await fetch(
      `${CONFIG.BASE_URL}/users/${String(userId)}/${kind}`,
      {
        headers: { Authorization: `Bearer ${token}` },
        method: "DELETE",
      },
    );

  if (!response.ok) {
    throw new Error(await getImageErrorMessage(response));
  }
}
