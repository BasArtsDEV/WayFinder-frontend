import React, { useState } from "react";
import { useLocation } from "wouter";
import { ROUTES } from "../config.ts";
import { useAuth } from "../contexts/AuthContext.ts";
import {
  updateUser,
  type User,
  type UserUpdateData,
} from "../services/user.ts";
import { isPasswordValid, PASSWORD_RULES_MESSAGE } from "../utils/password.ts";

export function useSettings(user: User) {
  const [firstName, setFirstName] = useState(user.firstName),
    [lastName, setLastName] = useState(user.lastName),
    [email, setEmail] = useState(user.email),
    [password, setPassword] = useState(""),
    [confirmPassword, setConfirmPassword] = useState(""),
    [error, setError] = useState<string | null>(null),
    [isLoading, setIsLoading] = useState(false),
    { setUser } = useAuth(),
    [, setLocation] = useLocation();

  function getPasswordError(): string | null {
    if (!password && !confirmPassword) {
      return null;
    }
    if (password !== confirmPassword) {
      return "Les mots de passe ne correspondent pas.";
    }
    if (!isPasswordValid(password)) {
      return PASSWORD_RULES_MESSAGE;
    }
    return null;
  }

  function handleSubmit(event: React.SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    const passwordError = getPasswordError(),
      data: UserUpdateData = { email, firstName, lastName };

    if (passwordError) {
      setError(passwordError);
      return;
    }

    if (password) {
      data.password = password;
    }

    setIsLoading(true);

    updateUser(user.id, data)
      .then((updatedUser: User) => {
        setUser({ ...user, ...updatedUser });
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
        setIsLoading(false);
      });
  }

  return {
    error,
    fields: {
      confirmPassword,
      email,
      firstName,
      lastName,
      password,
      setConfirmPassword,
      setEmail,
      setFirstName,
      setLastName,
      setPassword,
    },
    handleSubmit,
    isLoading,
  };
}
