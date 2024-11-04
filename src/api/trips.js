import { mainFetch, fetchUserData } from "api";
import { URL, ERROR_MESSAGES } from "constants/constants";

const fetchTrips = async (includeUserData = false) => {

    const trips = await mainFetch(URL.TRIPS, ERROR_MESSAGES.TRIP_FETCH_FAILED);

    if (includeUserData) {
        const tripsWithUserPromises = trips.map(async (trip) => {
            const user = await fetchUserData(trip.author_id);
            return {
                ...trip,
                user
            };
        });

        return await Promise.all(tripsWithUserPromises);
    }

    return trips;
};

export default fetchTrips;