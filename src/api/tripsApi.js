import { fetchUserData } from "./userApi";
import { TRIPS_URL, ERROR_MESSAGES } from "constants/constants";

export const fetchTrips = async (includeUserData = false) => {
    const response = await fetch(TRIPS_URL);
    if (!response.ok) {
        throw new Error(ERROR_MESSAGES.TRIP_FETCH_FAILED);
    }

    const trips = await response.json();

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

}