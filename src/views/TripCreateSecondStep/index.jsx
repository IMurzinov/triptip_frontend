// TODO: Изменить структуру second-step-container, чтобы LocationList позиционировался справа на своем месте без position: absolut
// TODO: Прописать удаление элемента из fields при клике на корзину в LocationList
// TODO: Добавить отправку очереди элемента согласно документации API при загрузке путешествия

import { useState, Fragment, useRef } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";

import {
  Button,
  CreateLocation,
  CreateTripRoute,
  LocationList,
  AddRoute,
  AddLocation,
} from "components";

import "./index.css";

const SecondStep = ({ onNextStep, onPrevStep }) => {
  const [step, setStep] = useState("second");
  const { control, watch } = useFormContext();
  const { fields, insert } = useFieldArray({
    control,
    name: "tripElements",
  });

  const itemRefs = useRef({});

  const goToThirdStep = () => {
    onNextStep();
    setStep("third");
  };
  const goToFirstStep = () => {
    onPrevStep();
    setStep("first");
  };

  const watchTripElements = watch("tripElements", []);

  // вставить маршрут на позицию index
  const handleAddRouteAt = (index) => {
    insert(index, {
      type: "route",
      tripRouteDescription: "",
      // photos: []
    });
  };

  // вставить локацию на позицию index
  const handleAddLocationAt = (index) => {
    insert(index, {
      type: "location",
      locationName: "",
      locationStory: "",
      // photos: []
    });
  };

  const scrollToIndex = (index) => {
    const el = itemRefs.current[index];
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };


  return (
    <div className="second-step-container">
      <div className="trip-fields__wrapper">
        <div className="trip-fields">
          {fields.map((field, index) => {
            const nextField = fields[index + 1];
            return (
              // оборачиваем все в див с рефом
              <div
                key={field.id}
                ref={el => (itemRefs.current[index] = el)}
                className="location-and-routes-cards__wrapper"
              >
                {field.type === "location" && (
                  <>
                    <CreateLocation index={index} />
                    {nextField?.type !== "route" && (
                      <AddRoute onAddRoute={() => handleAddRouteAt(index + 1)} />
                    )}
                    {!nextField && (
                      <AddLocation onAddLocation={() => handleAddLocationAt(index + 1)} />
                    )}
                  </>
                )}

                {field.type === "route" && (
                  <>
                    <CreateTripRoute index={index} />
                    {!nextField && (
                      <AddLocation onAddLocation={() => handleAddLocationAt(index + 1)} />
                    )}
                  </>
                )}
              </div>
            );
          })}
        </div>
        <div className="buttons">
          <Button
            text="Назад"
            btnType="secondary"
            onClick={goToFirstStep}
          />
          <Button
            text="Следующий шаг"
            btnType="primary"
            onClick={goToThirdStep}
          />
        </div>
      </div>
      <LocationList
        fields={fields}
        watchTripElements={watchTripElements}
        scrollTo={scrollToIndex}
      />
    </div>
  );
};

export default SecondStep;
