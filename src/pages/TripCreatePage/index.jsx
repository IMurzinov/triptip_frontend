import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useForm, FormProvider, useFieldArray } from "react-hook-form";
import { parse, format } from "date-fns";

import { Footer, PageHeader, Button, Stepper, Header } from "components";
import { FirstStep, SecondStep, ThirdStep } from "views";
import { tripsAdd } from "features/userTrips/userTripsSlice";

import apiClient from "api/client";
import { URL } from "constants/constants";

import "./index.css";

const TripCreatePage = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const userId = useSelector(state => state.auth.user.id);
  const username = useSelector(state => state.auth.user.username);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // 1. Инициализируем форму
  const methods = useForm({
    mode: "onChange",
    defaultValues: {
      tripName: "",
      tripDates: "",
      tripElements: [
        {
          type: "location",
          locationName: "",
          locationStory: "",
          photos: [],
        },
      ],
    },
  });

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <FirstStep onNextStep={nextStep} />;
      case 2:
        return <SecondStep onNextStep={nextStep} onPrevStep={prevStep} />;
      case 3:
        return <ThirdStep onPrevStep={prevStep} />;
      default:
        return <div>Unknown step</div>;
    }
  };

  // 4. Финальный сабмит (шаг 3 -> «Опубликовать»).
  const onSubmit = async (data) => {
    let locationCounter = 1;
    console.log("Form data:", data);
    try {
      // (A) Парсим даты
      let [dateFrom, dateTo] = ["", ""];
      if (data.tripDates.includes("-")) {
        const parts = data.tripDates.split("-");
        const rawFrom = parts[0].trim();
        const rawTo   = parts[1].trim();

        // Сначала разбираем как dd.MM.yyyy:
        const parsedFrom = parse(rawFrom, 'dd.MM.yyyy', new Date());
        const parsedTo   = parse(rawTo, 'dd.MM.yyyy', new Date());

        // Затем форматируем в yyyy-MM-dd
        dateFrom = format(parsedFrom, 'yyyy-MM-dd');
        dateTo   = format(parsedTo, 'yyyy-MM-dd');
      }

      // (B) Создаём поездку:
      const tripResp = await apiClient(URL.TRIPS, {
        method: "POST",
        body: {
          name: data.tripName,
          description: "",  // Пока пустая
          region: "Asia",   // Пока хардкод
          date_from: dateFrom,
          date_to: dateTo,
        },
      });

      const tripId = tripResp.id; // Предположим, что сервер возвращает { id: ... }

      // (C) Храним {index -> location_id}, чтобы связывать маршруты с локациями
      const locationMap = {};

      // (D) Обходим всё в order, как лежит в tripElements
      for (let i = 0; i < data.tripElements.length; i++) {
        const elem = data.tripElements[i];

        // --- Если это локация ---
        if (elem.type === "location") {
          const locResp = await apiClient(`${URL.TRIPS}/${tripId}/locations`, {
            method: "POST",
            body: {
              name: elem.locationName,
              description: elem.locationStory || "",
              sequence_id: locationCounter,
            },
          });
          locationCounter += 1;
          console.log('Локация создана с id: ', locResp.id);
          const locationId = locResp.id;

          // Загрузка фотографий (если есть)
          if (elem.photos?.length) {
            for (const file of elem.photos) {
              const fd = new FormData();
              fd.append('file', file);
              fd.append('name', elem.locationName);
              fd.append('description', '');
              await apiClient(
                `${URL.TRIPS}/location/${locationId}/highlight`,
                { method: 'POST', body: fd }
              );
            }
          }

          // Запоминаем айди локации
          locationMap[i] = locationId;

        // --- Если это маршрут ---
        } else if (elem.type === "route") {
          // 1) Ищем предыдущую локацию в массиве
          let originIndex = -1;
          for (let j = i - 1; j >= 0; j--) {
            if (data.tripElements[j].type === "location") {
              originIndex = j;
              break;
            }
          }
          if (originIndex < 0) {
            throw new Error("Не найдена предыдущая локация для маршрута");
          }
          const originLocationId = locationMap[originIndex];
          if (!originLocationId) {
            throw new Error("Ошибка: не найден location_id для маршрута");
          }

          // 2) Создаём маршрут
          const routeResp = await apiClient(`${URL.TRIPS}/locations/${originLocationId}/route`, {
            method: "POST",
            body: {
              description: elem.tripRouteDescription || "",
              origin_id: originLocationId,
            },
          });
          console.log('Маршрут создан с id: ', routeResp.id);
          const routeId = routeResp.id;

          // 3) Фотографии маршрута (если есть)
          if (elem.photos?.length) {
            for (const file of elem.photos) {
              const fd = new FormData();
              fd.append('file', file);
              fd.append('name', '');
              fd.append('description', elem.tripRouteDescription);
              await apiClient(
                `${URL.TRIPS}/route/${routeId}/highlight`,
                { method: 'POST', body: fd }
              );
            }
          }
        }
      }

      // (E) Обновляем список поездок в стейте юзера
      const getUserTripUrl = `${URL.GET_USER}/${userId}/trips`;
      const tripFetchResponse = await apiClient(getUserTripUrl);
      dispatch(tripsAdd({
        trips: tripFetchResponse.trips,
        totalCount: tripFetchResponse.total_count,
      }));

      // (F) Перенаправляем обратно на страницу профиля
      console.log(`Успешно создана поездка c trip_id = ${tripId}`);
      navigate(`/profile/${username}`);

    } catch (err) {
      console.error("Ошибка при создании поездки:", err);
      console.log(`Ошибка: ${err.message || "Что-то пошло не так"}`);
    }
  };

  return (
    <FormProvider {...methods}>
      {/* onSubmit ссылается на onSubmit в этом компоненте */}
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="trip-create-page__layout">
          <PageHeader />
          <main className="trip-create-page__content">
            <Button
              text="« Назад"
              btnType="plain"
              className="back-button"
              onClick={() => navigate(-1)}
            />
            <div className="trip-create-page__main">
              <div className="trip-create-page__nav">
                <Header text="Создание поездки" hdrType="page" />
                <Stepper currentStep={currentStep} />
              </div>
              <div className="trip-content">
                {renderStep()}
              </div>
            </div>
          </main>
          <Footer />
        </div>
      </form>
    </FormProvider>
  );
};

export default TripCreatePage;