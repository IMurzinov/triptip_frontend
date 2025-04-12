import { AUTH } from "constants/constants";
import { store } from "store.js";
import { refreshSuccess, logout } from "features/auth/authSlice";

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
            // 1) Берём refresh_token из Redux
            const state = store.getState();
            const currentRefreshToken = state.auth.refreshToken;
            if (!currentRefreshToken) {
                throw new Error("No refresh_token in store");
            }

            // 2) Запрашиваем обновление
            const response = await fetch(AUTH.REFRESH, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                refresh_token: currentRefreshToken,
                }),
                credentials: "include", 
            });

            if (!response.ok) {
                // рефреш-токен уже не валиден -> логаут
                store.dispatch(logout());
                throw new Error("Refresh token invalid or expired");
            }

            // 3) Получаем новый access_token (и, при необходимости, новый refresh_token)
            const data = await response.json();
            const newAccessToken = data.access_token;
            const newRefreshToken = data.refresh_token;

            // 4) Диспатчим refreshSuccess, чтобы обновить в Redux
            store.dispatch(refreshSuccess({
                accessToken: newAccessToken,
                refreshToken: newRefreshToken, // если бэкенд возвращает обновлённый refresh_token
            }));

            // 5) Уведомляем все запросы, что токен обновлён
            isRefreshing = false;
            onTokenRefreshed();
        } catch (error) {
            isRefreshing = false;
            throw error; // Обработка ошибки обновления токена
        }
    }
};

// Основная функция API клиента
const apiClient = async (endpoint, { method = 'GET', headers = {}, body } = {}) => {
    const token = store.getState().auth.token;
    const finalHeaders = {
        ...headers,
    };
    if (token) {
        finalHeaders['Authorization'] = `Bearer ${token}`;
    }

    const options = {
        method,
        headers: finalHeaders,
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
        const response = await fetch(endpoint, options);
    
        if (!response.ok) {
          // Если получили 401 — значит, access_token просрочен или невалиден
          if (response.status === 401) {
            return new Promise((resolve, reject) => {
              // Добавляем запрос в очередь (refreshSubscribers),
              // чтобы повторить его после обновления
              addRefreshSubscriber(() => {
                resolve(apiClient(endpoint, { method, headers, body }));
              });
    
              // Если обновление еще не запущено, запускаем
              if (!isRefreshing) {
                refreshToken().catch((err) => {
                  // Если рефреш не удался — выкидываем ошибку и делаем логаут
                  store.dispatch(logout());
                  reject(err);
                });
              }
            });
          }
    
          // Иные HTTP-ошибки
          const errorData = await response.json();
          throw new Error(errorData.message || "Произошла ошибка");
        }
    
        // Если всё ок
        return await response.json();
      } catch (error) {
        throw error;
      }
};

export default apiClient;