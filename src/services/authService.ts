import { CONFIG } from "../config.ts";

interface LoginResponse {
  token: string;
}

export interface RegisterData {
  email: string;
  password: string;
  username: string;
  firstName: string;
  lastName: string;
}

interface ConstraintViolation {
  propertyPath: string;
  message: string;
}

interface ConstraintViolationResponse {
  violations?: ConstraintViolation[];
  detail?: string;
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

export async function register(data: RegisterData): Promise<void> {
  const response = await fetch(`${CONFIG.BASE_URL}register`, {
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
  });

  if (response.status === 422) {
    const body = (await response.json()) as ConstraintViolationResponse;
    if (body.violations && body.violations.length > 0) {
      const messages = body.violations.map((violation) => violation.message);
      throw new Error(messages.join("\n"));
    }
    throw new Error(body.detail ?? "Les données saisies sont invalides.");
  }

  if (!response.ok) {
    throw new Error("Une erreur est survenue. Veuillez réessayer plus tard.");
  }
}
