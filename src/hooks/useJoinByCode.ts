import React, { useState } from "react";
import { useLocation } from "wouter";
import type { TreasureHunt } from "../../types/TreasureHunt.ts";
import { ROUTES } from "../config.ts";
import { getTreasureHuntByCode } from "../services/treasure-hunts.ts";

export function useJoinByCode() {
  const [code, setCode] = useState<string>(""),
    [error, setError] = useState<string | null>(null),
    [isLoading, setIsLoading] = useState<boolean>(false),
    [, setLocation] = useLocation();

  function handleSubmit(event: React.SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!code.trim()) {
      setError("Veuillez saisir un code d'invitation.");
      return;
    }

    setError(null);
    setIsLoading(true);

    getTreasureHuntByCode(code)
      .then((hunt: TreasureHunt) => {
        setLocation(`${ROUTES.HUNTS}/${hunt.id.toString()}`);
      })
      .catch((err: unknown) => {
        setError(
          err instanceof Error
            ? err.message
            : "Une erreur est survenue. Veuillez réessayer plus tard.",
        );
        setIsLoading(false);
      });
  }

  return { code, error, handleSubmit, isLoading, setCode };
}
