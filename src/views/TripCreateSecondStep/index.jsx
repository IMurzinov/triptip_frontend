import { useState } from "react";

import { Button, CreateLocation, CreateTripRoute, LocationList } from "components";

import "./index.css";

const SecondStep = ({ onNextStep, onPrevStep }) => {
    const [step, setStep] = useState('second');

    const goToThirdStep = () => {
        onNextStep();
        setStep('third');
    };

    const goToFirstStep = () => {
        onPrevStep();
        setStep('first');
    };

    return (
        <div className="second-step-container">
            <LocationList />
            <div className="trip-fields">
                <CreateLocation />
            </div>
            <div className="buttons">
                <Button
                    text="Назад"
                    btnType="secondary"
                    onClick={goToFirstStep}
                />
                <Button 
                    text="Сохранить как черновик"
                    btnType="secondary"
                />
                <Button
                    text="Следующий шаг"
                    btnType="primary"
                    onClick={goToThirdStep}
                />
            </div>
        </div>
    );
};

export default SecondStep;

