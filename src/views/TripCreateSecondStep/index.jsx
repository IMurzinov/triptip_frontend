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
        name: "locations",
    });

    const goToThirdStep = () => {
        onNextStep();
        setStep('third');
    };

    const goToFirstStep = () => {
        onPrevStep();
        setStep('first');
    };

    const watchLocations = watch("locations", []);

    const handleAddLocation = () => {
        append({
            locationName: "",
            locationStory: "",
        });
    };

    return (
        <div className="second-step-container">
            <LocationList 
                onAddLocation={handleAddLocation}
                fields={fields}
                watchLocations={watchLocations}
            />
            <div className="trip-fields">
                {fields.map((field, index) => (
                    <CreateLocation
                        key={field.id}  // у каждого field есть id, который нужен для корректного рендеринга
                        index={index}   // передаём индекс, чтобы в CreateLocation знать, куда регистрировать поля
                    />
                ))}
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

