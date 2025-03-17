import { useState } from "react";

import { Footer, PageHeader, Button, Stepper, Header } from "components";
import { FirstStep, SecondStep, ThirdStep } from "views";

import "./index.css";

const TripCreatePage = () => {
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

        const renderStep = () => {
            switch (currentStep) {
                case 1:
                    return <FirstStep onNextStep={nextStep} />;
                case 2:
                    return <SecondStep onNextStep={nextStep} onPrevStep={prevStep} />;
                case 3:
                    return <ThirdStep onPrevStep={prevStep} />;
                // default:
                //     return <div>Unknown step</div>;
            }
        };

    return (
        <div className="trip-create-page__layout">
            <PageHeader />
            <main className="trip-create-page__content">
                <Button
                    text="« Назад"
                    btnType="plain"
                    className="back-button"
                />
                <div className="trip-create-page__main">
                    <div className="trip-create-page__nav">
                        <Header
                            text="Создание поездки"
                            hdrType="page"
                        />
                        <Stepper currentStep={currentStep} />
                    </div>
                    <div className="trip-content">
                        {renderStep()}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default TripCreatePage;