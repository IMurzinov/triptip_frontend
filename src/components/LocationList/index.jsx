//TODO: Исправить переключение фокуса на след инпут при клике на кнопки добавления маршрутов и локаций
//TODO: Проверить правильность порядка хранения локаций и маршрутов в объекте fields
//TODO: Настроить корректное отображение возможности сделать клик в location-list-item (по отдельности на хедер и на корзину) и перенос строки хедера

import React, { useEffect, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import { Header } from "components";
import trashBin from "assets/images/trashBin.svg";

import "./index.css";

const LocationList = ({ fields, scrollTo }) => {
  const { watch } = useFormContext();
  const containerRef = useRef(null);

  // topOffset в формате "123px"
  const [topOffset, setTopOffset] = useState("0px");

  useEffect(() => {
    const calcOffset = () => {
      const headerEl = document.querySelector(".page-header");
      if (!headerEl) return;

      // высота хедера
      const headerHeight = headerEl.getBoundingClientRect().height;

      // 1rem в px
      const rootFontSize = parseFloat(
        getComputedStyle(document.documentElement).fontSize
      );

      const offsetPx = headerHeight + rootFontSize * 2; // header + 2rem
      setTopOffset(`${offsetPx}px`);
    };

    // первый расчёт
    calcOffset();
    // пересчитать при ресайзе окна (и изменении root font-size)
    window.addEventListener("resize", calcOffset);
    return () => window.removeEventListener("resize", calcOffset);
  }, []);

  return (
    <div
      ref={containerRef}
      className="location-list-container"
      style={{
        position: "sticky",
        top: topOffset,
      }}
    >
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
              <div
                className="location__header"
                onClick={() => scrollTo(index)}
              >
                <Header text={displayTitle} hdrType="location" />
              </div>
              <img src={trashBin} alt="delete icon" className="trash-icon"/>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LocationList;
