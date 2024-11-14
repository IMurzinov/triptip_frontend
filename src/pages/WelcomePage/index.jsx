import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { fetchTrips } from "api";
import { PageHeader, 
         Button,
         Header,
         TopTripsCard,
         TopTripFetchFailPlaceholder,
         TopTripsEmptyPlaceholder,
        } from "components";
import * as constants from "constants/constants";

import "./index.css";

const WelcomePage = () => {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {

        const loadTrips = async () => {
            setLoading(true);
            try {
                const tripsWithUserData = await fetchTrips();
                setData(tripsWithUserData);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        loadTrips();

    }, []);

    if (loading) {
        return <div>{constants.LOADING_MESSAGE}</div>;
    }
    
    if (error) {
        console.log(`Error: ${error.message}`)
    }

    const limitedData = data.slice(0, constants.DISPLAY_LIMIT);

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

                    {error ? (
                            <TopTripFetchFailPlaceholder />
                        ) : limitedData.length === 0 ? (
                            <TopTripsEmptyPlaceholder />
                        ) : (
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
                                        user_id={trip.author.id}
                                        firstLastname={trip.author.first_name + ' ' + trip.author.last_name}
                                        username={trip.author.username}
                                    />
                                ))}
                            </div>
                        )}
                </div>
            </main>
        </div>
    )
};

export default WelcomePage;