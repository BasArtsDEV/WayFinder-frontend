interface ApiErrorResponse {
  detail?: string;
  description?: string;
  violations?: { message: string }[];
}

/**
 * Returns the headers of an authenticated API request
 */
export function getAuthHeaders(
  contentType = "application/ld+json",
): Record<string, string> {
  const token = localStorage.getItem("token"),
    headers: Record<string, string> = { "Content-Type": contentType };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
}

/**
 * Returns the error message sent by the API, or the given fallback message
 */
export async function getErrorMessage(
  response: Response,
  fallback: string,
): Promise<string> {
  const body = (await response.json().catch(() => ({}))) as ApiErrorResponse;

  if (body.violations?.length) {
    return body.violations.map((violation) => violation.message).join("\n");
  }

  return body.detail ?? body.description ?? fallback;
}
