import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { loginSuccess, logout } from "features/auth/authSlice";
import { apiClient } from "api";
import { AUTH } from "constants/constants";

const AuthCheck = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const initializeAuth = async () => {
            const isAuthenticated = localStorage.getItem('isAuthenticated');
            console.log("Проверили значение isAuthenticated в localStorage");

            if (isAuthenticated) {
                try {
                    // Пытаемся обновить токен
                    console.log("isAuthenticated === true, поэтому отправляем запрос на refresh");
                    const response = await apiClient(AUTH.REFRESH, { method: 'POST' });
                    console.log("Отправили запрос на refresh, обновляем стейт пользователя");
                    // Успешное обновление токена и получение данных пользователя
                    dispatch(loginSuccess({ user: response.user_data })); 
                } catch (error) {
                    console.error("Ошибка обновления токена:", error.message);
                    
                    // Если ошибка, разлогиниваем пользователя
                    localStorage.removeItem('isAuthenticated');
                    dispatch(logout());
                }
            }
        };

        initializeAuth();
    }, [dispatch]);

    return null;
};

export default AuthCheck;