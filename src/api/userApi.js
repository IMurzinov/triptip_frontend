import { GET_USER_URL, ERROR_MESSAGES } from "constants/constants";

export const fetchUserData = async (userID) => {
    const response = await fetch(`${GET_USER_URL}/${userID}`);
    if (!response.ok) {
        throw new Error(ERROR_MESSAGES.USER_FETCH_FAILED)
    }
    return await response.json();
};