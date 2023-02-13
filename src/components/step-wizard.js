import React, { useEffect, useState } from "react";
import "../styles/step-wizard.css";
const StepWizard = ({ steps, canNextStep, setCanNextStep }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    setCurrentStep(currentStep + 1);
  };

  const handlePrev = () => {
    setCurrentStep(currentStep - 1);
  };
  useEffect(() => {
    if (!steps[currentStep].required) {
      setCanNextStep(true);
    }
  }, [currentStep]);
  const [showError, setShowError] = useState(false);
  return (
    <div className="step-wizard">
      <ol className="step-indicator">
        {steps.map((step, index) => (
          <li
            key={"step" + index}
            className={`step ${index === currentStep ? "active" : ""}`}
          >
            <span className="step-title">{step.title}</span>
          </li>
        ))}
        <div className="step-line"></div>
      </ol>
      {steps[currentStep].component}
      {showError && <div style={{ color: "red" }}>This field is required</div>}
      <div className="step-actions">
        {currentStep > 0 && (
          <button className="btn prev" onClick={handlePrev}>
            Prev
          </button>
        )}
        {currentStep < steps.length - 1 && (
          <button
            className="btn-fill pull-right btn btn-info"
            onClick={() => {
              if (canNextStep) {
                handleNext();
                setCanNextStep(false);
                setShowError(false);

              } else {
                setShowError(true);
              }
            }}
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default StepWizard;
