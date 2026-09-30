import React, { useState } from "react";
import { useLocation } from "wouter";
import { ROUTES } from "../config.ts";
import { register, type RegisterData } from "../services/authService.ts";

export function useRegister() {
  const [username, setUsername] = useState(""),
    [email, setEmail] = useState(""),
    [firstName, setFirstName] = useState(""),
    [lastName, setLastName] = useState(""),
    [password, setPassword] = useState(""),
    [confirmPassword, setConfirmPassword] = useState(""),
    [error, setError] = useState<string | null>(null),
    [isLoading, setIsLoading] = useState(false),
    [, setLocation] = useLocation();

  function handleSubmit(event: React.SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    setIsLoading(true);

    const data: RegisterData = {
      email,
      firstName,
      lastName,
      password,
      username,
    };

    register(data).then(
      () => {
        setIsLoading(false);
        setLocation(ROUTES.LOGIN);
      },
      (err: unknown) => {
        setIsLoading(false);
        setError(
          err instanceof Error
            ? err.message
            : "Une erreur est survenue. Veuillez réessayer plus tard.",
        );
      },
    );
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
    setConfirmPassword,
    setEmail,
    setFirstName,
    setLastName,
    setPassword,
    setUsername,
    username,
  };
}
