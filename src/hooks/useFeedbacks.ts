import { useCallback, useEffect, useState } from "react";
import type { Enrollment } from "../../types/Enrollment.ts";
import type { Feedback, FeedbacksCollection } from "../../types/Feedback.ts";
import { useAuth } from "../contexts/AuthContext.ts";
import getEnrollmentsByTreasureHunt, {
  getUserEnrollmentForHunt,
} from "../services/enrollments.ts";

function getErrorText(err: unknown, fallback: string): string {
  return err instanceof Error ? err.message : fallback;
}

export function useFeedbacks(huntId: number, huntIri?: string) {
  const { user } = useAuth(),
    [feedbacks, setFeedbacks] = useState<Feedback[]>([]),
    [userEnrollment, setUserEnrollment] = useState<Enrollment | null>(null),
    [error, setError] = useState<string | null>(null),
    [isLoading, setIsLoading] = useState<boolean>(true),
    loadFeedbacks = useCallback(async () => {
      const data: FeedbacksCollection =
        await getEnrollmentsByTreasureHunt(huntId);

      setFeedbacks(data.member);
    }, [huntId]);

  useEffect(() => {
    const requests: [Promise<void>, Promise<Enrollment | null>] = [
      loadFeedbacks(),
      user && huntIri
        ? getUserEnrollmentForHunt(user.id, huntIri).catch(() => null)
        : Promise.resolve(null),
    ];

    Promise.all(requests)
      .then(([, enrollment]) => {
        setUserEnrollment(enrollment);
      })
      .catch((err: unknown) => {
        setError(
          getErrorText(err, "Impossible de charger les avis pour le moment."),
        );
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [huntIri, loadFeedbacks, user]);

  function handleReviewSubmitted(updated: Enrollment) {
    setUserEnrollment(updated);
    loadFeedbacks().catch((err: unknown) => {
      setError(getErrorText(err, "Impossible de recharger les avis."));
    });
  }

  return {
    error,
    feedbacks,
    handleReviewSubmitted,
    isLoading,
    userEnrollment,
  };
}
