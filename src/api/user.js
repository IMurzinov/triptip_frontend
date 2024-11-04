import { mainFetch } from "api";
import { URL, ERROR_MESSAGES } from "constants/constants";

const fetchUserData = async (userID) => {
    return await mainFetch(`${URL.GET_USER}/${userID}`, ERROR_MESSAGES.USER_FETCH_FAILED);
};

export default fetchUserData;