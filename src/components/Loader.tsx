import Stylesheet from "./Stylesheet.tsx";

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
      <span className="loader loader-small" role="status" aria-label={label}>
        <Stylesheet href="/css/Loader.css" />
      </span>
    );
  }

  return (
    <div className="loader-container" role="status">
      <Stylesheet href="/css/Loader.css" />
      <div className="loader" aria-hidden="true"></div>
      <p className="loader-text">{label}</p>
    </div>
  );
}
