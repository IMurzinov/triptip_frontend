import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { TopTripsCard } from "components";
import { PageHeader, Button, Header } from "components";
import { TRIPS_URL, GET_USER_URL } from "constants/constants";

import 'pages/StartingPage/index.css';

const StartingPage = () => {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {

        const fetchTrips = async () => {
            setLoading(true);
            try {
                const response = await fetch(TRIPS_URL);
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const trips = await response.json();

                const tripsWithUserPromises = trips.map(async (trip) => {
                    const userResponse = await fetch(`${GET_USER_URL}/${trip.author_id}`);
                    if (!userResponse.ok) {
                        throw new Error("User data fetch failed");
                    }
                    const user = await userResponse.json();

                    return {
                        ...trip,
                        user
                    };
                });

                const tripsWithUserData = await Promise.all(tripsWithUserPromises);
                setData(tripsWithUserData);

            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchTrips();

    }, []);

    if (loading) {
        return <div>Одну секунду, загружаю...</div>;
    }
    
    if (error) {
        return <div>Error: {error.message}</div>;
    }

    const limitedData = data.slice(0, 5);

// TODO: Настроить корректный скролл на список поездок

    function scrollTo() {
        const elem = document.querySelector('.starting-page__top-trips');

        if (elem) {
            elem.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <div className="starting-page__layout">
            <PageHeader />
            <main className="starting-page__content">
                <div className="starting-page__welcome-container">
                    <div className="starting-page__welcome-text">
                        <p className="starting-page__mojo">
                            Открой для себя новые места<br/>
                            и создавай незабываемые маршруты<br/>
                            вместе с нами!
                        </p>
                        <p className="starting-page__description">
                            TripTip — это ваш персональный путеводитель, где можно легко хранить<br/>
                            и делиться впечатлениями о путешествиях.
                        </p>
                    </div>
                    <div className="starting-page__buttons">
                        <Link className="link" to="/register">
                            <Button
                                btnType="primary"
                                text="Зарегистрироваться"
                                type="button"
                            />
                        </Link>
                        <Button
                            btnType="secondary"
                            text="Посмотреть путешествия"
                            type="button"
                            onClick={scrollTo}
                        />
                    </div>
                </div>
                <div className="starting-page__top-trips">

                    <Header 
                        text="Популярные путешествия"
                        hdrType="page"
                    />

                    <div className="top-trips__list">
                        {limitedData.map((trip) => (
                            <TopTripsCard
                                key={trip.id}
                                name={trip.name}
                                location={trip.region}
                                dateFrom={trip.date_from}
                                dateTo={trip.date_to}
                                likes="999"
                                comments="999"
                                user_id={trip.user.id}
                                username={trip.user.username}
                                nickname={trip.user.nickname}
                            />
                        ))}
                    </div>
                    {/* TODO: Добавить компонент списка топ-поездок с отображением автора, лайков и комментов */}
                </div>
            </main>
        </div>
    )
};

export default StartingPage;