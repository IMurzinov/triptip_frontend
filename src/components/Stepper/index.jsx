import check from "assets/images/check.svg";

import "./index.css";

// const Stepper = () => {
//     return (
//         <div className="stepper">
//             <div className="step active">1</div>
//             <div className="step finished hidden">
//                 <img className="check-img" src={check} alt="check icon" />
//             </div>
//             <hr className="divider" />
//             <div className="step default">2</div>
//             <div className="step finished hidden">
//                 <img className="check-img" src={check} alt="check icon" />
//             </div>
//             <hr className="divider" />
//             <div className="step default">3</div>
//             <div className="step finished hidden">
//                 <img className="check-img" src={check} alt="check icon" />
//             </div>
//         </div>
//     );
// };

const Stepper = ({ currentStep }) => {
  return (
    <div className="stepper-container">
      <div className="stepper">
        {[1, 2, 3].map((step, index) => (
          <div key={step} className="stepper-item">
            <div
              className={`step ${step === currentStep ? "active" : step < currentStep ? "finished" : "default"}`}
            >
              {step < currentStep ? (
                <img className="check-img" src={check} alt="check icon" />
              ) : (
                step
              )}
            </div>
            {index < 2 && <hr className="divider" />} 
          </div>
        ))}
      </div>
      <div className="stepper-text">
        {[1, 2, 3].map((step) => (
          <div key={`text-${step}`} className="text-group">
            <p className={`text upper ${step === currentStep ? "chosen" : "inactive"}`}>
              {step === 1 ? "Название" : step === 2 ? "Локации" : "Дополнительно"}
            </p>
            <p className={`text lower ${step === currentStep ? "chosen" : "inactive"}`}>
              Description
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stepper;