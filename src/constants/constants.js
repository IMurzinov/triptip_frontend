export const BASE_URL = "https://api.triptip.pro"

export const URL = {
  TRIPS: `${BASE_URL}/trips`,
  GET_USERS: `${BASE_URL}/users`,
  REGISTER: `${BASE_URL}/auth/register`,
};

export const AUTH = {
  REGISTER: `${BASE_URL}/auth/register`,
  LOGIN: `${BASE_URL}/auth/login`,
  REFRESH: `${BASE_URL}/auth/refresh`,
  LOGOUT: `${BASE_URL}/auth/logout`,
};

export const ERROR_MESSAGES = {
  NETWORK_ERROR: "Network response was not ok.",
  USERPIC_FETCH_FAILED: "Failed to fetch userpic",
  USER_FETCH_FAILED: "Failed to fetch user data.",
  TRIP_FETCH_FAILED: "Failed to fetch trips data.",
};

export const LOADING_MESSAGE = "Одну секунду, загружаю"

export const DISPLAY_LIMIT = 5;