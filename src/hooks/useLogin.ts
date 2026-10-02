import React, { useState } from "react";
import { useLocation } from "wouter";
import { ROUTES } from "../config.ts";
import { useAuth } from "../contexts/AuthContext.ts";
import { login } from "../services/authService.ts";
import { getMe } from "../services/user.ts";

/**
 * Hook that encapsulates login form state and submission logic.
 */
export function useLogin() {
  const [email, setEmail] = useState(""),
    [password, setPassword] = useState(""),
    [error, setError] = useState<string | null>(null),
    [isLoading, setIsLoading] = useState(false),
    [, setLocation] = useLocation(),
    { setUser } = useAuth();

  function handleSubmit(event: React.SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setIsLoading(true);

    login(email, password).then(
      async () => {
        setIsLoading(false);
        const userData = await getMe();
        setUser(userData);
        setLocation(ROUTES.USER_VIEW);
      },
      (err: unknown) => {
        setIsLoading(false);
        setError(
          err instanceof Error
            ? err.message
            : "Impossible de contacter le serveur. Vérifiez votre connexion.",
        );
      },
    );
  }

  return {
    email,
    error,
    handleSubmit,
    isLoading,
    password,
    setEmail,
    setPassword,
  };
}
