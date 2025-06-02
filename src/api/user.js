import { apiClient } from "api";
import { URL, ERROR_MESSAGES } from "constants/constants";

const fetchUserData = async (userID) => {
    try {
        return await apiClient(`${URL.GET_USERS}/${userID}`);
    } catch (error) {
        throw new Error(ERROR_MESSAGES.USER_FETCH_FAILED);
    }
};

export default fetchUserData;