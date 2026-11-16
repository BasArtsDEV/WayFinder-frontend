import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import type { Enrollment } from "../../types/Enrollment.ts";
import type { CreatorTeam } from "../../types/Team.ts";
import type { TreasureHunt } from "../../types/TreasureHunt.ts";
import { ROUTES } from "../config.ts";
import { useAuth } from "../contexts/AuthContext.ts";
import {
  createEnrollment,
  getUserEnrollmentForHunt,
} from "../services/enrollments.ts";
import { getUserParticipantTeams } from "../services/teams.ts";

const SOLO_MODE = "";

function getMessage(err: unknown): string {
  return err instanceof Error
    ? err.message
    : "Une erreur est survenue. Veuillez réessayer plus tard.";
}

export function useHuntPlay(hunt: TreasureHunt) {
  const { user } = useAuth(),
    [, setLocation] = useLocation(),
    [enrollment, setEnrollment] = useState<Enrollment | null>(null),
    [teams, setTeams] = useState<CreatorTeam[]>([]),
    [teamIri, setTeamIri] = useState<string>(SOLO_MODE),
    [error, setError] = useState<string | null>(null),
    [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!user) {
      setIsLoading(false);
      return;
    }

    Promise.all([
      getUserEnrollmentForHunt(user.id, hunt["@id"]),
      getUserParticipantTeams(user.id),
    ])
      .then(([userEnrollment, userTeams]) => {
        setEnrollment(userEnrollment);
        setTeams(userTeams);
      })
      .catch((err: unknown) => {
        setError(getMessage(err));
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [user, hunt]);

  function play() {
    setError(null);
    setIsLoading(true);

    createEnrollment(hunt["@id"], teamIri === SOLO_MODE ? null : teamIri)
      .then((created: Enrollment) => {
        setLocation(`~${ROUTES.GAME}/${created.id.toString()}`);
      })
      .catch((err: unknown) => {
        setError(getMessage(err));
        setIsLoading(false);
      });
  }

  return {
    enrollment,
    error,
    isLoading,
    play,
    setTeamIri,
    teamIri,
    teams,
    user,
  };
}
