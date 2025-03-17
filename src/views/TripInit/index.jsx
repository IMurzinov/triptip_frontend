import { useFormContext } from 'react-hook-form';

import { Header, Input } from "components";

import "./index.css";

const TripInit = () => {
    const { register } = useFormContext();

    return (
        <div className="trip-details">
            <div className="trip-details__name">
                <Input
                    label={<Header hdrType="input" text="Название поездки"/>}
                    type="text"
                    placeholder="Например, “Удивительные путешествия Даши путешественницы”"
                    {...register('tripName', { required: true })}
                />
            </div>
            <div className="trip-details__dates">
                <Input
                    label={<Header hdrType="input" text="Даты поездки"/>}
                    type="text"
                    placeholder="17.07.2024 - 24.07.2024"
                    {...register('tripDates', { required: true })}
                />
            </div>
        </div>
    );
};

export default TripInit;
