import type { RiddleBaseProps } from "../../types/Riddle.ts";
import Loader from "../components/Loader.tsx";
import RiddleFrame from "../components/RiddleFrame.tsx";
import { useQRCodeScanner } from "../hooks/useQRCodeScanner.ts";

interface RiddleQRCodeViewProps extends RiddleBaseProps {
  isLoading: boolean;
  onScan: (value: string) => void;
}

/**
 * Riddle solved by finding and scanning a QR code.
 */
function RiddleQRCodeView({
  isLoading,
  onScan,
  ...riddle
}: RiddleQRCodeViewProps) {
  const { error, isScanning, start, stop, videoRef } = useQRCodeScanner(onScan);

  return (
    <RiddleFrame {...riddle}>
      <div className="riddle-actions">
        {isScanning ? (
          <div className="riddle-scanner">
            <video
              ref={videoRef}
              className="riddle-scanner__video"
              muted
              playsInline
            ></video>
            <span className="riddle-scanner__frame" aria-hidden="true"></span>
            <p className="riddle-scanner__hint">
              Placez le QR Code dans le cadre
            </p>
          </div>
        ) : (
          <div className="riddle-instruction">
            <i
              className="bi bi-qr-code-scan riddle-instruction__icon"
              aria-hidden="true"
            ></i>
            <h3 className="riddle-instruction__title">Trouvez le QR Code</h3>
            <p className="riddle-instruction__text">
              Afin de continuer votre quête, vous devez chercher un QR Code
              grâce aux indices ci-dessus.
            </p>
          </div>
        )}

        {error && (
          <div className="alert alert-danger riddle-error" role="alert">
            {error}
          </div>
        )}

        {isScanning ? (
          <button
            type="button"
            className="btn-app-primary riddle-actions__submit"
            onClick={stop}
          >
            <i className="bi bi-x-lg" aria-hidden="true"></i>
            <span>Annuler</span>
          </button>
        ) : (
          <button
            type="button"
            className="btn-app-primary riddle-actions__submit"
            onClick={start}
            disabled={isLoading}
          >
            <span className="btn-icon-wrapper">
              {isLoading ? (
                <Loader isSmall />
              ) : (
                <i className="bi bi-camera-fill" aria-hidden="true"></i>
              )}
            </span>
            <span>Scanner un QR Code</span>
          </button>
        )}
      </div>
    </RiddleFrame>
  );
}

export default RiddleQRCodeView;
