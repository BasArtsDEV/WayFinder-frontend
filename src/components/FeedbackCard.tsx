interface FeedbackCardProps {
  enrollments: object[];
}

export default function FeedbackCard({ enrollments }: FeedbackCardProps) {
  return (
    <article>
      <h3>{enrollments}</h3>
      <div>TEST</div>
    </article>
  );
}
