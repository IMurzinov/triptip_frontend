import { apiClient, fetchUserData } from "api";
import { URL, ERROR_MESSAGES } from "constants/constants";

const fetchTrips = async (includeUserData = false) => {
    try {
        const trips = await apiClient(URL.TRIPS);
        
        if (includeUserData) {
            const tripsWithUserPromises = trips.map(async (trip) => {
                const user = await fetchUserData(trip.author_id);
                return {
                    ...trip,
                    user,
                };
            });

            return await Promise.all(tripsWithUserPromises);
        }
        return trips;
    } catch (error) {
        throw new Error(ERROR_MESSAGES.TRIP_FETCH_FAILED);
    }
};

export default fetchTrips;