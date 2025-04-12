import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";

import { Footer, PageHeader, Button, Stepper, Header } from "components";
import { FirstStep, SecondStep, ThirdStep } from "views";

import { URL } from "constants/constants";

import "./index.css";

const TripCreatePage = () => {
  const [currentStep, setCurrentStep] = useState(1);

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
          // Можно также хранить здесь массив фотографий, если ImgUploader кладёт их в RHForm
          // photos: []
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
    console.log("Form data:", data);
    // data.tripName, data.tripDates, data.tripElements
    try {
      // (A) Парсим даты (если формат "2025-04-11" уже готов, то можно взять напрямую)
      // Предположим, пользователь вводит: "17.07.2025 - 24.07.2025"
      // Пример простого парсинга (будьте готовы обрабатывать ошибки и иные форматы).
      let [dateFrom, dateTo] = ["", ""];
      if (data.tripDates.includes("-")) {
        const parts = data.tripDates.split("-");
        dateFrom = parts[0].trim() || "";
        dateTo = parts[1].trim() || "";
      }

      // (B) Создаём поездку
      const tripResp = await fetch(URL.TRIPS, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.tripName,
          description: "", // Пока пустая
          region: "Asia",  // Пока хардкод
          date_from: dateFrom, 
          date_to: dateTo,
        }),
      });

      if (!tripResp.ok) {
        throw new Error("Не удалось создать поездку");
      }
      const tripCreated = await tripResp.json();
      const tripId = tripCreated.id; // Предположим, что сервер возвращает trip_id

      // (C) Мапа для хранения {tempId -> location_id} (чтобы знать, какой маршрут к какой локации относится)
      const locationMap = {};

      // (D) Обходим всё в order (т.е. так, как лежит в tripElements)
      for (let i = 0; i < data.tripElements.length; i++) {
        const elem = data.tripElements[i];

        if (elem.type === "location") {
          // 1) Создаём локацию
          const locResp = await fetch(`${URL.TRIPS}/${tripId}/locations`, {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: elem.locationName,
              description: elem.locationStory || "",
            }),
          });
          if (!locResp.ok) {
            throw new Error("Не удалось создать локацию");
          }
          const locCreated = await locResp.json();
          const locationId = locCreated.id;

          // 2) Если есть фотографии — отправляем каждую
          //    Предположим, вы храните их в elem.photos
          if (elem.photos && elem.photos.length > 0) {
            for (const photoFile of elem.photos) {
              const formData = new FormData();
              formData.append("file", photoFile);

              const photoResp = await fetch(`${URL.TRIPS}/location/${locationId}/highlight`, {
                method: "POST",
                credentials: "include",
                body: formData,
              });
              if (!photoResp.ok) {
                throw new Error("Не удалось загрузить фото локации");
              }
            }
          }

          // 3) Сохраняем связку
          locationMap[i] = locationId;

        } else if (elem.type === "route") {
          // 1) Нужно понять, после какой локации идёт этот маршрут.
          //    Допустим, route идёт после предыдущей локации в списке (или у вас другая логика).
          //    У вас в коде нет поля `originLocationIndex`,
          //    поэтому можно считать, что маршрут с index=i идёт после ближайшей локации слева.
          //    Пример (линейная логика): смотрим назад, ищем location.

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
          const routeResp = await fetch(`${URL.TRIPS}/locations/${originLocationId}/route`, {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              description: elem.tripRouteDescription || "",
              origin_id: originLocationId, // по условию
            }),
          });
          if (!routeResp.ok) {
            throw new Error("Не удалось создать маршрут");
          }
          const routeCreated = await routeResp.json();
          const routeId = routeCreated.id;

          // 3) Загружаем фотографии маршрута (если есть)
          if (elem.photos && elem.photos.length > 0) {
            for (const routePhoto of elem.photos) {
              const formData = new FormData();
              formData.append("file", routePhoto);

              const routePhotoResp = await fetch(`${URL.TRIPS}/route/${routeId}/highlight`, {
                method: "POST",
                credentials: "include",
                body: formData,
              });
              if (!routePhotoResp.ok) {
                throw new Error("Не удалось загрузить фото маршрута");
              }
            }
          }
        }
      }

      // Если всё успешно:
      console.log(`Успешно создана поездка c trip_id = ${tripId}`);
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
            <Button text="« Назад" btnType="plain" className="back-button" />
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