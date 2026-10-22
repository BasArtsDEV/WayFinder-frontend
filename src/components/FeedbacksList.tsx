import FeedbackCard from "./FeedbackCard.tsx";

interface FeedbacksListProps {
  enrollments: object[];
}

export default function FeedbacksList({ enrollments }: FeedbacksListProps) {
  return <FeedbackCard />;
}
