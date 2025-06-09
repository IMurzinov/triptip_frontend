import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { apiClient, auth } from "api";
import { URL } from "constants/constants";
import { loginSuccess } from "features/auth/authSlice";
import { tripsAdd } from "features/userTrips/userTripsSlice";

const VerifyPage = () => {
    const { verificationToken } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        setError(null);

        if(!verificationToken) {
            setLoading(false);
            setError("Токен не передан");
            return;
        }

        const verification = async () => {
            try {
                // Верификация эл.почты
                const verificationResponse = await apiClient(URL.VERIFY, {
                    method: 'POST',
                    body: {
                        token: verificationToken,
                    },
                })

                // Автоматическая авторизация пользователя
                const autoAuth = await auth(verificationResponse);

                // Собираем данные о путешествиях пользователя
                const tripsUrl = `${URL.GET_USERS}/${autoAuth.user_data.id}/trips`;
                const tripFetchResponse = await apiClient(tripsUrl);

                // Обновление состояния authSlice
                dispatch(loginSuccess({
                    user: autoAuth.user_data,
                    token: autoAuth.access_token,
                    refreshToken: autoAuth.refresh_token,
                }));

                // Обновление состояния userTripsSlice
                dispatch(tripsAdd({
                    trips: tripFetchResponse.trips,
                    totalCount: tripFetchResponse.total_count,
                }));

                //Перенаправление на страницу пользователя
                navigate(`/profile/${autoAuth.user_data.id}`)

            } catch(err) {
                console.warn("Ошибка верификации: ", err);
                setError(err.message || "Не удалось подтвердить почту");
            } finally {
                setLoading(false);
            }
        }
        verification();
    }, [verificationToken, dispatch, navigate]);

    if (loading) {
        return <p>Идёт верификация почты…</p>;
    }

    if (error) {
        return (
            <div>
                <h1>Ошибка при подтверждении</h1>
                <p>{error}</p>
                <button onClick={() => window.location.reload()}>
                    Попробовать снова
                </button>
            </div>
        );
    }

    return <p>Почта подтверждена! Перенаправляем на страницу профиля…</p>;

};

export default VerifyPage;
