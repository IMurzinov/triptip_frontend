import check from "assets/images/check.svg";

import "./index.css";

const Stepper = ({ currentStep, steps }) => {
  // Default steps for backward compatibility
  const defaultSteps = [
    { label: "Название", description: "Description" },
    { label: "Локации", description: "Description" },
    { label: "Дополнительно", description: "Description" }
  ];

  const stepLabels = steps || defaultSteps;

  return (
    <div className="stepper-container">
      <div className="stepper">
        {stepLabels.map((stepData, index) => {
          const stepNumber = index + 1;
          return (
            <div key={stepNumber} className="stepper-item">
              <div
                className={`step ${stepNumber === currentStep ? "current" : stepNumber < currentStep ? "finished" : "default"}`}
              >
                {stepNumber < currentStep ? (
                  <img className="check-img" src={check} alt="check icon" />
                ) : (
                  stepNumber
                )}
              </div>
              {index < stepLabels.length - 1 && (
                <hr className={`divider ${stepNumber < currentStep ? "completed" : ""}`} />
              )} 
            </div>
          );
        })}
      </div>
      <div className="stepper-text">
        {stepLabels.map((stepData, index) => {
          const stepNumber = index + 1;
          return (
            <div key={`text-${stepNumber}`} className="text-group">
              <p className={`text upper ${stepNumber === currentStep ? "chosen" : "inactive"}`}>
                {stepData.label}
              </p>
              {stepData.description && (
                <p className={`text lower ${stepNumber === currentStep ? "chosen" : "inactive"}`}>
                  {stepData.description}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Stepper;