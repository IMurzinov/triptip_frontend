//TODO: Настроить корректную нумерацию остановок
//TODO: Исправить переключение фокуса на след инпут при клике на кнопки добавления маршрутов и локаций
//TODO: Проверить правильность порядка хранения локаций и маршрутов в объекте fields

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useFormContext, useFieldArray } from "react-hook-form";

import drag from "assets/images/drag.svg";
import { Header, Button } from "components";

import "./index.css";

const LocationList = ({ fields, onAddLocation, onAddRoute, disableAddRouteBtn }) => {
  const { control, getValues, watch } = useFormContext();
  const { move } = useFieldArray({ control, name: "tripElements" });

  /**
   * Проверяем, чтобы не было двух подряд идущих маршрутов.
   * Если найдём items[i] и items[i+1], оба type="route", вернём false.
   */
  const isValidSequence = (items) => {
    for (let i = 0; i < items.length - 1; i++) {
      if (items[i].type === "route" && items[i + 1].type === "route") {
        return false;
      }
    }
    return true;
  };

  /**
   * Срабатывает при окончании перетаскивания.
   * Если перетаскивание не изменило позицию, ничего не делаем.
   * Иначе переставляем элементы через move(...).
   * Если получился невалидный порядок (два route подряд), откатываем.
   */
  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;
    if (source.index === destination.index && source.droppableId === destination.droppableId) {
      return;
    }

    // Переставляем
    move(source.index, destination.index);

    // Проверяем, не получились ли два "route" подряд
    const newValues = getValues("tripElements");
    if (!isValidSequence(newValues)) {
      // Если невалидно, откатываем
      move(destination.index, source.index);
    }
  };

  /**
   * Для нумерации локаций заведём переменную `locationIndex`.
   * При проходе по полям будем инкрементировать её только если `type === "location"`.
   * Таким образом маршруты не учитываются в нумерации.
   */
  let locationIndex = 0;

  return (
    <div className="location-list-container">
      <Header text="Структура" hdrType="section" />

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="locationListDroppable">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="location-list-droppable"
            >
              {fields.map((field, index) => {
                // Если элемент — локация, увеличиваем счётчик на 1
                if (field.type === "location") {
                  locationIndex += 1;
                }

                // Для локаций попробуем взять название из RHF
                let displayTitle = "Маршрут";
                if (field.type === "location") {
                  const locationName = watch(`tripElements.${index}.locationName`);
                  displayTitle = locationName?.trim()
                    ? locationName
                    : `Остановка №${locationIndex}`;
                }

                return (
                  <Draggable key={field.id} draggableId={field.id} index={index}>
                    {(providedDrag, snapshot) => (
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
                        <div
                          className="location__header"
                          {...providedDrag.dragHandleProps}
                        >
                          <img src={drag} className="drag-icon" alt="drag icon" />
                          <Header text={displayTitle} hdrType="location" />
                        </div>
                      </div>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      {/* Кнопки «Добавить маршрут» / «Добавить локацию» */}
      <div className="location-list__buttons">
        <Button
          text="Добавить маршрут"
          btnType="primary"
          onClick={onAddRoute}
          disabled={disableAddRouteBtn}
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
