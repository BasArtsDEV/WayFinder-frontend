import React, { useState } from "react";
import { useLocation } from "wouter";
import { ROUTES } from "../config.ts";
import { login } from "../services/authService.ts";

/**
 * Hook that encapsulates login form state and submission logic.
 */
export function useLogin() {
  const [email, setEmail] = useState(""),
    [password, setPassword] = useState(""),
    [error, setError] = useState<string | null>(null),
    [isLoading, setIsLoading] = useState(false),
    [, setLocation] = useLocation();

  function handleSubmit(event: React.SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setIsLoading(true);

    login(email, password).then(
      () => {
        setIsLoading(false);
        setLocation(ROUTES.HOME);
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
