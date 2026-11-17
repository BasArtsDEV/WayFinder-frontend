interface LoaderProps {
  isSmall?: boolean;
  label?: string;
}

export default function Loader({
  isSmall = false,
  label = "Chargement...",
}: LoaderProps) {
  if (isSmall) {
    return (
      <span
        className="loader loader-small"
        role="status"
        aria-label={label}
      ></span>
    );
  }

  return (
    <div className="loader-container" role="status">
      <div className="loader" aria-hidden="true"></div>
      <p className="loader-text">{label}</p>
    </div>
  );
}
