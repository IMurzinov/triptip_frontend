//TODO: добавить механизм добавления строчки локации или дороги при заполнении карточки левее на странице

import drag from "assets/images/drag.svg";
import { Header, Button } from "components";

import "./index.css";


const LocationList = ({ fields, watchTripElements, onAddLocation, onAddRoute }) => {
    let locationCount = 0;

    return (
      <div className="location-list-container">
        <Header text="Структура" hdrType="section" />
  
        {fields.map((field, index) => {
          // watchTripElements[index] содержит «живое» (актуальное) значение,
          // которое пользователь вводит в форму
          const element = watchTripElements[index];
  
          if (field.type === "location") {
            locationCount += 1;
            // Для локации выводим введённое название или «Остановка №...»
            const locationName = element?.locationName?.trim() || "";
            return (
              <div className="location" key={field.id}>
                <div className="location__header">
                  <img src={drag} className="drag-icon" alt="drag icon" />
                  <Header
                    text={locationName || `Остановка №${locationCount}`}
                    hdrType="location"
                  />
                </div>
              </div>
            );
          }
  
          if (field.type === "route") {
            // Для маршрута просто пишем "Маршрут"
            return (
              <div className="location" key={field.id}>
                <div className="location__header">
                  <img src={drag} className="drag-icon" alt="drag icon" />
                  <Header text="Маршрут" hdrType="location" />
                </div>
              </div>
            );
          }
  
          return null;
        })}
  
        <div className="location-list__buttons">
          <Button
            text="Добавить маршрут"
            btnType="primary"
            onClick={onAddRoute}
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