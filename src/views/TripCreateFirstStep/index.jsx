import { useState } from "react";

import { Button } from "components";
import { TripInit, SecondStep } from "views";

import "./index.css";

const FirstStep = ({ onNextStep }) => {
    const [step, setStep] = useState('first');

    const goToSecondStep = () => {
        onNextStep(); // Вызов функции обратного вызова для изменения шага в родителе
        setStep('second');
    };

    const renderFirstStep = () => {
        return (
            <div className="first-step-container">
                <TripInit />
                <Button 
                    btnType="primary"
                    text="Следующий шаг"
                    onClick={goToSecondStep}
                />
            </div>
        );
    };

 return (
    <div>
        {step === 'first' ? (
            renderFirstStep()
        ) : (
            <SecondStep />
        )}
    </div>
 );
};

export default FirstStep;