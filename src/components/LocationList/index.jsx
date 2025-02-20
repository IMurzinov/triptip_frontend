//TODO: добавить механизм добавления строчки локации или дороги при заполнении карточки левее на странице

import drag from "assets/images/drag.svg";
import { Header, Button } from "components";

import "./index.css";

const LocationList = (locationList) => {
    return (
        <div className="location-list-container">
            <Header
                text="Структура"
                hdrType="section"
            />
            <div className="location">
                <div className="location__header">
                    <img src={drag} className="drag-icon" alt="drag icon" />
                    <Header 
                        text="Первая остановка"
                        hdrType="location"
                    />
                </div>
                <p className="location__name">Локация</p>
            </div>
            <div className="location-list__buttons">
                <Button
                    text="Добавить маршрут"
                    btnType="primary"
                />
                <Button
                    text="Добавить локацию"
                    btnType="primary"
                />
            </div>
        </div>
    );
};

export default LocationList;