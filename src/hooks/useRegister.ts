import React, { useState } from "react";
import { useLocation } from "wouter";
import { ROUTES } from "../config.ts";
import { register } from "../services/authService.ts";

function isPasswordValid(password: string): boolean {
  return (
    password.length >= 8 &&
    /[A-Z]/u.test(password) &&
    /[0-9]/u.test(password) &&
    /[^A-Za-z0-9]/u.test(password)
  );
}

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
    [, setLocation] = useLocation();

  function resetErrors() {
    setError(null);
    setPasswordError(null);
  }

  function handleSubmit(event: React.SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    resetErrors();

    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    if (!isPasswordValid(password)) {
      setPasswordError(
        "Le mot de passe doit contenir au moins 8 caractères, une majuscule, un chiffre et un caractère spécial.",
      );
      return;
    }

    setIsLoading(true);

    register({ email, firstName, lastName, password, username }).then(
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
