import { useState } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";

import { Button, CreateLocation, CreateTripRoute, LocationList } from "components";

import "./index.css";

const SecondStep = ({ onNextStep, onPrevStep }) => {
  const [step, setStep] = useState("second");

  const { control, watch } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "tripElements",
  });

  const goToThirdStep = () => {
    onNextStep();
    setStep("third");
  };

  const goToFirstStep = () => {
    onPrevStep();
    setStep("first");
  };

  const watchTripElements = watch("tripElements", []);

  // Кнопка «Добавить маршрут» неактивна, если последний элемент уже маршрут
  const lastField = fields[fields.length - 1];
  const disableAddRoute = lastField && lastField.type === "route";

  const handleAddLocation = () => {
    append({
      type: "location",
      locationName: "",
      locationStory: "",
      // photos: []
    });
  };

  const handleAddRoute = () => {
    append({
      type: "route",
      tripRouteDescription: "",
      // photos: []
    });
  };

  return (
    <div className="second-step-container">
      <LocationList
        onAddLocation={handleAddLocation}
        onAddRoute={handleAddRoute}
        fields={fields}
        watchTripElements={watchTripElements}
        disableAddRouteBtn={disableAddRoute}
      />
      <div className="trip-fields">
        {fields.map((field, index) => {
          if (field.type === "location") {
            return <CreateLocation key={field.id} index={index} />;
          }
          if (field.type === "route") {
            return <CreateTripRoute key={field.id} index={index} />;
          }
          return null;
        })}
      </div>
      <div className="buttons">
        <Button text="Назад" btnType="secondary" onClick={goToFirstStep} />
        <Button text="Сохранить как черновик" btnType="secondary" />
        <Button text="Следующий шаг" btnType="primary" onClick={goToThirdStep} />
      </div>
    </div>
  );
};

export default SecondStep;
