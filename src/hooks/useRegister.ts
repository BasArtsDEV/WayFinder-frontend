import React, { useState } from "react";
import { useLocation } from "wouter";
import { ROUTES } from "../config.ts";
import { useAuth } from "../contexts/AuthContext.ts";
import { login, register } from "../services/authService.ts";
import { getMe } from "../services/user.ts";

export function useRegister() {
  const [username, setUsername] = useState(""),
    [email, setEmail] = useState(""),
    [firstName, setFirstName] = useState(""),
    [lastName, setLastName] = useState(""),
    [password, setPassword] = useState(""),
    [confirmPassword, setConfirmPassword] = useState(""),
    [error, setError] = useState<string | null>(null),
    [passwordError, setPasswordError] = useState<string | null>(null),
    [isLoading, setIsLoading] = useState(false),
    { setUser } = useAuth(),
    [, setLocation] = useLocation(),
    resetErrors = () => {
      setError(null);
      setPasswordError(null);
    };

  function handleSubmit(event: React.SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    resetErrors();

    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    setIsLoading(true);

    register({ email, firstName, lastName, password, username })
      .then(async () => {
        await login(email, password);

        const userData = await getMe();
        setUser(userData);
        setLocation(ROUTES.USER_VIEW);
      })
      .catch((err: unknown) => {
        setError(
          err instanceof Error
            ? err.message
            : "Une erreur est survenue. Veuillez réessayer plus tard.",
        );
      })
      .finally(() => {
        setError(null);
        setIsLoading(false);
      });
  }

  return {
    confirmPassword,
    email,
    error,
    firstName,
    handleSubmit,
    isLoading,
    lastName,
    password,
    passwordError,
    setConfirmPassword,
    setEmail,
    setFirstName,
    setLastName,
    setPassword,
    setUsername,
    username,
  };
}
