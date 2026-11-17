interface ProgressBarProps {
  step: number;
  totalSteps: number;
}

function ProgressBar({ step, totalSteps }: ProgressBarProps) {
  const progressPercentage = Math.min(
    Math.max((step / totalSteps) * 100, 0),
    100,
  );

  return (
    <div className="riddle-progress-wrapper">
      <span className="riddle-progress-text">
        Étape {step} sur {totalSteps}
      </span>
      <div className="riddle-progress-container">
        <div
          className="riddle-progress-bar"
          style={{ width: `${progressPercentage.toString()}%` }}
        />
      </div>
    </div>
  );
}

export default ProgressBar;
