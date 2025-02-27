import { useState } from "react";

import { Button, Header, Stepper } from "components";

import "./index.css";

const SecondStep = () => {
    const [currentStep, setCurrentStep] = useState(1);

    const nextStep = () => {
        if (currentStep < 3) {
            setCurrentStep(currentStep + 1);
        }
    };

    const prevStep = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    }

    return (
        <div className="trip-creation-page">
            <Button
                text="« Назад"
                btnType="plain"
                className="back-button"
            />
            <div className="trip-main">
                <div className="trip-nav">
                    <Header
                        text="Создание поездки"
                        hdrType="page"
                    />
                    <Stepper currentStep={currentStep} />
                </div>
                <div className="trip-content">
                    <div className="trip-fields">

                    </div>
                    <div className="buttons">
                        <Button
                            text="Назад"
                            btnType="secondary"
                            onClick={prevStep}
                        />
                        <Button 
                            text="Сохранить как черновик"
                            btnType="secondary"
                        />
                        <Button
                            text="Следующий шаг"
                            btnType="primary"
                            onClick={nextStep}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SecondStep;

