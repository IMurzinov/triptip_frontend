import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { Footer, PageHeader } from "components";
import { URL } from "constants/constants";

import "./index.css";
import { apiClient } from "api";

const TripGuidePage = () => {
    const { id } = useParams();

    // Проверяем, смотрим ли мы чужую поездку или свою
    const currentUser = useSelector((state) => state.auth.user); 
    const currentUserId = currentUser?.id?.toString(); // приводим к строке для сравнения

    // Стейты для загрузки данных
    const [tripData, setTripData] = useState([]);
    const [locationsData, setLocationsData] = useState([]);
    const [locHighlightsData, setLocHighlightsData] = useState();
    const [routesData, setRoutesData] = useState([]);
    const [routesHighlightsData, setRoutesHighlightsData] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    //Загрузка данных о поездке
    useEffect(() => {
        setLoading(true);
        setError(null);

        const fetchTrip = async () => {
            try {
                // Запрашиваем данные о поездке
                const tripResponse = await apiClient(`${URL.TRIPS}/${id}`);
                if (!tripResponse) {
                    throw new Error("Поездка не найдена");
                }
                setTripData(tripResponse);

                // Запрашиваем локации поездки
                const locationsResponse = await apiClient(`${URL.TRIPS}/${id}/locations`);
                if (!locationsResponse) {
                    throw new Error("Остановки не найдены");
                }
                setLocationsData(locationsResponse);

                // Запрашиваем фотографии локаций
                const locHighlightPromises = locationsResponse.map((location) =>
                    apiClient(`${URL.TRIPS}/location/${location.id}/highlights`)
                        .then((photos) => ({
                            locationId: location.id,
                            photos: Array.isArray(photos) ? photos : [],
                        }))
                        .catch((err) => {
                            console.warn(`Не удалось загрузить фотографии для локации ${location.id}:`, err);
                            return {
                                locationId: location.id,
                                photos: [],
                            };
                        })
                );
                const highlightsByLocation = await Promise.all(locHighlightPromises);
                const locPhotosMap = {};
                highlightsByLocation.forEach(({ locationId, photos }) => {
                    locPhotosMap[locationId] = photos;
                });
                setLocHighlightsData(locPhotosMap);

                // Запрашиваем маршруты поездки
                const routesPromises = locationsResponse.map((location) =>
                    apiClient(`${URL.TRIPS}/locations/${location.id}/route`)
                        .then((route) => ({
                            locationId: location.id,
                            route: route || null,
                        }))
                        .catch((err) => {
                            console.warn(`Не удалось загрузить маршрут для локации ${location.id}:`, err);
                            return {
                                locationId: location.id,
                                route: null,
                            };
                        })
                );
                const routesByLocation = await Promise.all(routesPromises);
                const routesMap = {};
                routesByLocation.forEach(({locationId, route}) => {
                    routesMap[locationId] = route
                });
                setRoutesData(routesMap);

                //Запрашиваем фотографии маршрутов
                const routesArr = Object.values(routesMap).filter((route) => route !== null);
                const routesHighlightsPromises = routesArr.map((route) =>
                    apiClient(`${URL.TRIPS}/route/${route.id}/highlights`)
                        .then((photos) => ({
                            routeId: route.id,
                            photos: Array.isArray(photos) ? photos : [],
                        }))
                        .catch((err) => {
                            console.warn(`Не удалось загрузить фотографии для маршрута ${route.id}:`, err);
                            return {
                                routeId: route.id,
                                photos: [],
                            };
                        })
                );
                const highlightsByRoute = await Promise.all(routesHighlightsPromises);
                const routesPhotosMap = {};
                highlightsByRoute.forEach(({ routeId, photos}) => {
                    routesPhotosMap[routeId] = photos;
                });
                setRoutesHighlightsData(routesPhotosMap);

            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };
        fetchTrip();
    }, [id]);

    return (
        <div className="trip-guide-page__layout">
            <PageHeader />
            <main className="trip-guide-page__content">
                <p>Скоро здесь будет отчет о поездке с id = {id}</p>
                <pre>{JSON.stringify(tripData, null, 2)}</pre>
                <pre>{JSON.stringify(locationsData, null, 2)}</pre>
                <pre>{JSON.stringify(routesData, null, 2)}</pre>
            </main>
            <Footer />
        </div>
    )
};

export default TripGuidePage;