export const BASE_URL = "https://api.triptip.pro";
export const TRIPS_URL = `${BASE_URL}/trips`;
export const GET_USER_URL = `${BASE_URL}/users/get_user`;

export const DISPLAY_LIMIT = 5;

export const ERROR_MESSAGES = {
    NETWORK_ERROR: "Network response was not ok.",
    USER_FETCH_FAILED: "Failed to fetch user data.",
    TRIP_FETCH_FAILED: "Failed to fetch trips data.",
  };

export const LOADING_MESSAGE = "Одну секунду, загружаю"