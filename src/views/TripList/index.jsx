import { useState, useEffect } from "react";

import { TripCard } from '../../components';
import { DISPLAY_LIMIT, BASE_URL } from '../../constants/constants';

import './index.css';

const TRIPS_URL = `${BASE_URL}/trips`;

const TripList = () => {
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
                const data = await response.json();
                setData(data);
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

    const limitedData = data.slice(0, DISPLAY_LIMIT);
    
    return (
        <div className="trip-list">
            {limitedData.map(trip => (
                <TripCard
                key={trip.id}
                name={trip.name}
                location={trip.region}
                dateFrom={trip.date_from}
                dateTo={trip.date_to}
                />
            ))}
        </div>
    );
};

export default TripList;