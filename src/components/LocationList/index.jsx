//TODO: Настроить корректную нумерацию остановок
//TODO: Исправить переключение фокуса на след инпут при клике на кнопки добавления маршрутов и локаций
//TODO: Проверить правильность порядка хранения локаций и маршрутов в объекте fields


import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useFormContext, useFieldArray } from "react-hook-form";

import drag from "assets/images/drag.svg";
import { Header, Button } from "components";

import "./index.css";


const LocationList = ({ fields, watchTripElements, onAddLocation, onAddRoute }) => {
    let locationCount = 0;

    const { control, getValues } = useFormContext();
    const { move } = useFieldArray({ control, name: "tripElements" });

    const isValidSequence = (items) => {
      for (let i = 0; i < items.length - 1; i++) {
        if (items[i].type === "route" && items[i+1].type === "route") {
          return false;
        }
      }
      return true;
    };

    const onDragEnd = (result) => {
      const { source, destination } = result;
      if (!destination) return;
      if (source.index === destination.index && source.droppableId === destination.droppableId) {
        return;
      }

      // Переставляем
      move(source.index, destination.index);

      // Проверяем двух route подряд
      const newValues = getValues("tripElements");
      if (!isValidSequence(newValues)) {
        // Откат
        move(destination.index, source.index);
      }
    };

    return (
      <div className="location-list-container">
        {/* Заголовок "Структура" */}
        <Header text="Структура" hdrType="section" />
  
        {/* DnD-контекст */}
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="locationListDroppable">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="location-list-droppable"
              >
                {fields.map((field, index) => {
                  // Получаем текущее "живое" значение
                  const element = watchTripElements[index];
  
                  // Подготовим заголовок
                  if (field.type === "location") {
                    locationCount += 1;
                  }
  
                  return (
                    <Draggable key={field.id} draggableId={field.id} index={index}>
                      {(providedDrag, snapshot) => {
                        // Логика определения заголовка
                        let displayTitle = "Маршрут";
                        if (field.type === "location") {
                          const locName = element?.locationName?.trim() || "";
                          displayTitle = locName || `Остановка №${locationCount}`;
                        }
  
                        return (
                          <div
                            ref={providedDrag.innerRef}
                            {...providedDrag.draggableProps}
                            style={{
                              ...providedDrag.draggableProps.style,
                              userSelect: "none",
                              opacity: snapshot.isDragging ? 0.8 : 1,
                            }}
                            className="location-list-item"
                          >
                            {/* Шапка элемента - "ручка" перетаскивания */}
                            <div
                              className="location__header"
                              {...providedDrag.dragHandleProps}
                            >
                              <img src={drag} className="drag-icon" alt="drag icon" />
                              <Header text={displayTitle} hdrType="location" />
                            </div>
                          </div>
                        );
                      }}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        {/* Кнопки "Добавить маршрут" / "Добавить локацию" */}
        <div className="location-list__buttons">
          <Button text="Добавить маршрут" btnType="primary" onClick={onAddRoute} />
          <Button text="Добавить локацию" btnType="primary" onClick={onAddLocation} />
        </div>    
      </div>
    );
  };
  
  export default LocationList;
