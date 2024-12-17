import { apiClient } from "api";
import { AUTH } from "constants/constants";

const auth = async (data) => {
    return await apiClient(AUTH.LOGIN, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: {
            grant_type: 'password',
            username: data.email,
            password: data.password,
        },
    });
};

export default auth;