import { useState } from "react";

export interface Coordinates {
  accuracy: number;
  latitude: number;
  longitude: number;
}

export function useGeolocation(onLocated: (coordinates: Coordinates) => void) {
  const [isLocating, setIsLocating] = useState(false),
    [error, setError] = useState<string | null>(null);

  function locate() {
    setError(null);
    setIsLocating(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setIsLocating(false);
        onLocated({
          accuracy: position.coords.accuracy,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (err) => {
        setIsLocating(false);
        setError(
          err.code === err.PERMISSION_DENIED
            ? "L'accès à votre position a été refusé. Autorisez-le dans votre navigateur."
            : "Impossible de récupérer votre position.",
        );
      },
      { enableHighAccuracy: true },
    );
  }

  return { error, isLocating, locate };
}
