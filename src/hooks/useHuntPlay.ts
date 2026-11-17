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

export type PlayMode = "solo" | "team";

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
    [playMode, setPlayMode] = useState<PlayMode>("solo"),
    [teamIri, setTeamIri] = useState<string>(""),
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
        if (userTeams.length > 0) {
          setTeamIri(userTeams[0]["@id"]);
        }
      })
      .catch((err: unknown) => {
        setError(getMessage(err));
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [user, hunt]);

  function handleModeChange(newMode: PlayMode) {
    setPlayMode(newMode);
    if (newMode === "team" && teams.length > 0 && !teamIri) {
      setTeamIri(teams[0]["@id"]);
    }
  }

  function play() {
    setError(null);
    setIsLoading(true);

    const selectedTeam = playMode === "solo" ? null : teamIri || null;

    createEnrollment(hunt["@id"], selectedTeam)
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
    handleModeChange,
    isLoading,
    play,
    playMode,
    setTeamIri,
    teamIri,
    teams,
    user,
  };
}
