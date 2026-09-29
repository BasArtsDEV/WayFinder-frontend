import { CONFIG } from "../config.ts";

interface LoginResponse {
  token: string;
}

function storeToken({ token }: LoginResponse): string {
  localStorage.setItem("token", token);
  return token;
}

/**
 * Sends login credentials to the API and returns the JWT token.
 */
export async function login(email: string, password: string): Promise<string> {
  const response = await fetch(`${CONFIG.BASE_URL}login`, {
    body: JSON.stringify({ email, password }),
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
  });

  if (response.status === 401) {
    throw new Error("Identifiants incorrects. Veuillez réessayer.");
  }

  if (!response.ok) {
    throw new Error("Une erreur est survenue. Veuillez réessayer plus tard.");
  }

  return storeToken((await response.json()) as LoginResponse);
}
