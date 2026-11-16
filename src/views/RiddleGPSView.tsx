import type { RiddleBaseProps } from "../../types/Riddle.ts";
import RiddleFrame from "../components/RiddleFrame.tsx";
import { type Coordinates, useGeolocation } from "../hooks/useGeolocation.ts";

interface RiddleGPSViewProps extends RiddleBaseProps {
  onValidateLocation: (coordinates: Coordinates) => void;
}

/**
 * Riddle solved by going to a precise place.
 */
function RiddleGPSView({ onValidateLocation, ...riddle }: RiddleGPSViewProps) {
  const { error, locate } = useGeolocation(onValidateLocation);

  return (
    <RiddleFrame {...riddle}>
      <div className="riddle-actions">
        <div className="riddle-instruction">
          <i
            className="bi bi-geo-alt-fill riddle-instruction__icon"
            aria-hidden="true"
          ></i>
          <h3 className="riddle-instruction__title">
            Rendez-vous dans un lieu précis
          </h3>
          <p className="riddle-instruction__text">
            Afin de continuer votre quête, vous devez vous rendre dans un lieu
            précis grâce aux indices ci-dessus.
          </p>
        </div>

        {error && (
          <div className="alert alert-danger riddle-error" role="alert">
            {error}
          </div>
        )}

        <button
          type="button"
          className="btn-app-primary riddle-actions__submit"
          onClick={locate}
        >
          <span className="btn-icon-wrapper">
            <img src="/icons/check.png" className="btn-action-icon" alt="" />
          </span>
          <span>Valider ma localisation</span>
        </button>
      </div>
    </RiddleFrame>
  );
}

export default RiddleGPSView;
