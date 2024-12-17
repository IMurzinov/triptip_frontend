import { AUTH } from "constants/constants";

// Переменные для очереди на обновление токена
let isRefreshing = false; // Индикатор, обновляется ли сейчас токен
let refreshSubscribers = []; // Очередь запросов, ожидающих обновления токена

// Уведомить все запросы, которые ждали обновления токена
const onTokenRefreshed = () => {
    refreshSubscribers.forEach((callback) => callback());
    refreshSubscribers = []; // Очищаем очередь
};

// Добавить запрос в очередь на ожидание обновления токена
const addRefreshSubscriber = (callback) => {
    refreshSubscribers.push(callback);
};

// Функция для обновления токена
const refreshToken = async () => {
    if (!isRefreshing) {
        isRefreshing = true;

        try {
            // Запрос на обновление токена
            await apiClient(AUTH.REFRESH, { method: 'POST' });
            isRefreshing = false;
            onTokenRefreshed(); // Уведомляем все запросы из очереди
        } catch (error) {
            isRefreshing = false;
            throw error; // Обработка ошибки обновления токена
        }
    }
};

// Основная функция API клиента
const apiClient = async (endpoint, { method = 'GET', headers = {}, body } = {}) => {
    const options = {
        method,
        headers: {
            ...headers, // Пользовательские заголовки
        },
        credentials: 'include', // Работа с httpOnly куки
    };

    // Обработка тела запроса
    if (body) {
        if (headers['Content-Type'] === 'application/x-www-form-urlencoded') {
            options.body = new URLSearchParams(body).toString(); // Кодируем тело в URL-кодировку
        } else {
            options.body = JSON.stringify(body); // Преобразуем тело в JSON
            options.headers['Content-Type'] = 'application/json'; // Устанавливаем заголовок
        }
    }

    try {
        const response = await fetch(`${endpoint}`, options);

        if (!response.ok) {
            if (response.status === 401) {
                // Если токен истек, добавляем запрос в очередь и обновляем токен
                return new Promise((resolve, reject) => {
                    addRefreshSubscriber(() => resolve(apiClient(endpoint, { method, headers, body })));

                    // Если обновление токена еще не началось, запускаем процесс
                    if (!isRefreshing) {
                        refreshToken().catch(reject); // Если обновление не удалось, отклоняем запрос
                    }
                });
            }

            // Если другая ошибка, выбрасываем исключение
            const errorData = await response.json();
            throw new Error(errorData.message || 'Произошла ошибка');
        }

        return await response.json(); // Возвращаем успешный результат
    } catch (error) {
        throw error; // Пробрасываем ошибки для дальнейшей обработки
    }
};

export default apiClient;