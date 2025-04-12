// TODO: Настроить цвета в DatePicker

import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import DatePicker from "react-datepicker";
import { format } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";

import { Header, Input } from "components";

import "./index.css";

const TripInit = () => {
  
  const { register, setValue } = useFormContext();

  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;

  const handleDateChange = (update) => {
    setDateRange(update);
    if (update[0] && update[1]) {
      const start = format(update[0], "dd.MM.yyyy");
      const end = format(update[1], "dd.MM.yyyy");
      setValue("tripDates", `${start} - ${end}`, { shouldValidate: true });
    }
  };

  /**
   * Мы передадим DatePicker’у спец. проп `customInput`, чтобы он вместо своего
   * стандартного инпута использовал наш компонент <Input/> (со стилями и т.д.).
   * Обязательно оборачиваем в forwardRef, иначе DatePicker не сможет корректно
   * управлять фокусом.
   */
  const CustomInput = React.forwardRef(({ value, onClick }, ref) => (
    <Input
      label={<Header hdrType="input" text="Даты поездки" />}
      type="text"
      placeholder="17.07.2024 - 24.07.2024"
      onClick={onClick}
      value={value || ""}   // Строка диапазона приходит от DatePicker как "value"
      readOnly              // Чтобы пользователь не вводил руками
      ref={ref}
      {...register("tripDates", { required: true })}
    />
  ));

  return (
    <div className="trip-details">
      <div className="trip-details__name">
        <Input
          label={<Header hdrType="input" text="Название поездки" />}
          type="text"
          placeholder="Например, “Удивительные путешествия Даши путешественницы”"
          {...register("tripName", { required: true })}
          autoComplete="off"
        />
      </div>

      <div className="trip-details__dates">
        <DatePicker
          selectsRange
          startDate={startDate}
          endDate={endDate}
          onChange={handleDateChange}
          dateFormat="dd.MM.yyyy"
          placeholderText="17.07.2024 - 24.07.2024"
          // Чтобы календарь не схлопывался сразу после выбора первой даты:
          shouldCloseOnSelect={false}
          customInput={<CustomInput />}
          calendarClassName="trip-datepicker" 
        />
      </div>
    </div>
  );
};

export default TripInit;
