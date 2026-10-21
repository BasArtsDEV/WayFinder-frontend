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
      stars.push(<i className="bi bi-star-fill text-warning"></i>);
    } else {
      stars.push(
        <i className="bi bi-star-fill" style={{ color: "#e5e7eb" }}></i>,
      );
    }
  }

  return stars;
}
