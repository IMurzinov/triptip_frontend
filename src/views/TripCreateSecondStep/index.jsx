import { useState } from "react";
import { useFieldArray } from "react-hook-form";

import { Button, CreateLocation, CreateTripRoute, LocationList } from "components";

import "./index.css";
import { useFormContext } from "react-hook-form";

const SecondStep = ({ onNextStep, onPrevStep }) => {
    const [step, setStep] = useState('second');

    const { control, watch } = useFormContext();

    const { fields, append, remove } = useFieldArray({
        control,
        name: "tripElements",
    });

    const goToThirdStep = () => {
        onNextStep();
        setStep('third');
    };

    const goToFirstStep = () => {
        onPrevStep();
        setStep('first');
    };

    const watchTripElements = watch("tripElements", []);

    const handleAddLocation = () => {
        append({
            type: "location",
            locationName: "",
            locationStory: "",
        });
    };

    const handleAddRoute = () => {
        if (fields.length > 0 && fields[fields.length - 1].type === "route") {
            return
        }

        append({
            type: "route",
            tripRouteDescription: ""
        });
    };

    return (
        <div className="second-step-container">
            <LocationList 
                onAddLocation={handleAddLocation}
                onAddRoute={handleAddRoute}
                fields={fields}
                watchTripElements={watchTripElements}
            />
            <div className="trip-fields">
                {fields.map((field, index) => {
                    if (field.type === "location") {
                        return (
                            <CreateLocation
                                key={field.id}
                                index={index}
                            />
                        );
                    }
                    if (field.type === "route") {
                        return (
                            <CreateTripRoute
                                key={field.id}
                                index={index}
                            />
                        );
                    }
                    return null;
                })}
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

