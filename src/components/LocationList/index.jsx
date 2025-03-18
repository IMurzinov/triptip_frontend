//TODO: добавить механизм добавления строчки локации или дороги при заполнении карточки левее на странице

import drag from "assets/images/drag.svg";
import { Header, Button } from "components";

import "./index.css";

const LocationList = ({ watchLocations, onAddLocation, fields }) => {
    return (
        <div className="location-list-container">
            <Header
                text="Структура"
                hdrType="section"
            />
            {fields.map((field, index) => {
                const locationName =
                watchLocations?.[index]?.locationName?.trim() || "";
                return (
                    <div className="location" key={field.id}>
                        <div className="location__header">
                        <img src={drag} className="drag-icon" alt="drag icon" />
                        <Header
                            // Если локация пуста, пишем какую-нибудь заглушку
                            text={locationName || `Остановка №${index + 1}`}
                            hdrType="location"
                        />
                        </div>
                    </div>
                );
            })}
            <div className="location-list__buttons">
                <Button
                    text="Добавить маршрут"
                    btnType="primary"
                />
                <Button
                    text="Добавить локацию"
                    btnType="primary"
                    onClick={onAddLocation}
                />
            </div>
        </div>
    );
};

export default LocationList;