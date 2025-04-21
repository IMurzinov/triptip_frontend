import { useState, Fragment } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";

import {
  Button,
  CreateLocation,
  CreateTripRoute,
  LocationList,
  AddRoute,
} from "components";

import "./index.css";

const SecondStep = ({ onNextStep, onPrevStep }) => {
  const [step, setStep] = useState("second");

  const { control, watch } = useFormContext();

  const { fields, append, insert, remove } = useFieldArray({
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

  const handleAddLocation = () => {
    append({
      type: "location",
      locationName: "",
      locationStory: "",
      // photos: []
    });
  };

  const handleInsertRoute = (index) => {
    insert(index, {
      type: "route",
      tripRouteDescription: "",
      // photos: []
    });
  };

  return (
    <div className="second-step-container">
      <LocationList fields={fields} watchTripElements={watchTripElements} />
      <div className="trip-fields">
        {fields.map((field, index) => {
          const nextField = fields[index + 1];

          return (
            <Fragment key={field.id}>
              {field.type === "location" && <CreateLocation index={index} />}
              {field.type === "route" && <CreateTripRoute index={index} />}
              {field.type === "location" && nextField?.type !== "route" && (
                <AddRoute onAddRoute={() => handleInsertRoute(index + 1)} />
              )}
            </Fragment>
          );
        })}
      </div>
      <div className="buttons">
        <Button text="Назад" btnType="secondary" onClick={goToFirstStep} />
        <Button text="Следующий шаг" btnType="primary" onClick={goToThirdStep} />
      </div>
    </div>
  );
};

export default SecondStep;
