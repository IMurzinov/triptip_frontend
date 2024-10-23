import { useState, useEffect } from 'react';

import { fetchTrips } from 'api/tripsApi';
import { TripCard, TopTripFetchFailPlaceholder, TopTripsEmptyPlaceholder } from 'components';
import { DISPLAY_LIMIT, TRIPS_URL, ERROR_MESSAGES } from 'constants/constants';

import 'views/TripList/index.css';

const TripList = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {

        const loadTrips = async () => {
            setLoading(true);
            try {
                const response = await fetchTrips();
                setData(data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        loadTrips();

    }, []);

    if (loading) {
        return <div>Одну секунду, загружаю...</div>;
    }
    
    if (error) {
        console.log(`Error: ${error.message}`);
    }

    const limitedData = data.slice(0, DISPLAY_LIMIT);

    {error ? (
        <TopTripFetchFailPlaceholder />
    ) : limitedData.length === 0 ? (
        <TopTripsEmptyPlaceholder />
    ) : (
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
    )}
};

export default TripList;