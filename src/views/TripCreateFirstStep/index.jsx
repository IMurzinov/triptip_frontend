import { useState } from "react";
import { useFormContext } from "react-hook-form";

import { Button } from "components";
import { TripInit, SecondStep } from "views";

import "./index.css";

const FirstStep = ({ onNextStep }) => {
  const [step, setStep] = useState("first");
  // Используем watch, чтобы следить за значениями
  const { watch } = useFormContext();
  const tripNameValue = watch("tripName");
  const tripDatesValue = watch("tripDates");

  // Кнопка недоступна, если поля пустые
  const isDisabled = !tripNameValue?.trim() || !tripDatesValue?.trim();

  const goToSecondStep = () => {
    onNextStep(); // Переход из родителя
    setStep("second");
  };

  const renderFirstStep = () => {
    return (
      <div className="first-step-container">
        <TripInit />
        <Button
          btnType="primary"
          text="Следующий шаг"
          onClick={goToSecondStep}
          disabled={isDisabled}
        />
      </div>
    );
  };

  return (
    <div>
      {step === "first" ? renderFirstStep() : <SecondStep />}
    </div>
  );
};

export default FirstStep;