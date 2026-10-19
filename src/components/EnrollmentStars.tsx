interface EnrollmentStarsProps {
  averageRating: number;
}

const MAX_STARS = 5;

export default function EnrollmentStars({
  averageRating,
}: EnrollmentStarsProps) {
  const stars = [],
    fullStars = Math.floor(averageRating);

  // eslint-disable-next-line no-plusplus
  for (let star = 1; star <= MAX_STARS; star++) {
    if (star <= fullStars) {
      stars.push(
        <span key={star} className="star full">
          ★
        </span>,
      );
    } else {
      stars.push(
        <span key={star} className="star empty">
          ★
        </span>,
      );
    }
  }

  return stars;
}
