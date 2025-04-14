//TODO: Исправить переключение фокуса на след инпут при клике на кнопки добавления маршрутов и локаций
//TODO: Проверить правильность порядка хранения локаций и маршрутов в объекте fields

import { useFormContext } from "react-hook-form";
import { Header } from "components";
import "./index.css";

const LocationList = ({ fields }) => {
  const { watch } = useFormContext();

  return (
    <div className="location-list-container">
      <Header text="Структура" hdrType="section" />

      <div className="location-list-droppable">
        {fields.map((field, index) => {
          let displayTitle = "";
          if (field.type === "location") {
            const locationName = watch(`tripElements.${index}.locationName`);
            // Если для локации не введено название, элемент не рендерится
            if (!locationName || !locationName.trim()) {
              return null;
            }
            displayTitle = locationName;
          } else {
            // Для остальных типов (например, маршрутов) можно задать стандартное название, если это необходимо
            displayTitle = "Маршрут";
          }

          return (
            <div
              key={field.id}
              className="location-list-item"
              style={{ userSelect: "none" }}
            >
              <div className="location__header">
                <Header text={displayTitle} hdrType="location" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LocationList;
