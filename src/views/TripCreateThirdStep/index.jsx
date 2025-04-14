import { useState } from "react";

import { Header, Button } from "components";

import "./index.css";

const ThirdStep = ({ onTripSubmit, onTripDraftSave, onPrevStep }) => {
  const [step, setStep] = useState("third");

  const goToSecondStep = () => {
    onPrevStep();
    setStep("second");
  };

  return (
    <div className="third-step-container">
      {/* Позже добавить выбор тегов и т.д. */}
      <div className="third-step__buttons">
        <Button
          btnType="secondary"
          text="Назад"
          onClick={goToSecondStep}
        />
        {/* <Button
          btnType="secondary"
          text="Сохранить как черновик"
        /> */}
        {/* type="submit" запустит onSubmit в TripCreatePage */}
        <Button
          btnType="primary"
          text="Опубликовать"
          type="submit"
        />
      </div>
    </div>
  );
};

export default ThirdStep;