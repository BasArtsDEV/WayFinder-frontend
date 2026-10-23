import type { RiddleBaseProps } from "../../types/Riddle.ts";
import RiddleFrame from "../components/RiddleFrame.tsx";

interface RiddleQRCodeViewProps extends RiddleBaseProps {
  onScan: () => void;
}

/**
 * Riddle solved by finding and scanning a QR code.
 */
function RiddleQRCodeView({ onScan, ...riddle }: RiddleQRCodeViewProps) {
  return (
    <RiddleFrame {...riddle}>
      <div className="riddle-actions">
        <div className="riddle-instruction">
          <i
            className="bi bi-qr-code-scan riddle-instruction__icon"
            aria-hidden="true"
          ></i>
          <h3 className="riddle-instruction__title">Trouvez le QR Code</h3>
          <p className="riddle-instruction__text">
            Afin de continuer votre quête, vous devez chercher un QR Code grâce
            aux indices ci-dessus.
          </p>
        </div>

        <button
          type="button"
          className="btn-app-primary riddle-actions__submit"
          onClick={onScan}
        >
          <i className="bi bi-box-arrow-up-right" aria-hidden="true"></i>
          <span>Scanner un QR Code</span>
        </button>
      </div>
    </RiddleFrame>
  );
}

export default RiddleQRCodeView;
