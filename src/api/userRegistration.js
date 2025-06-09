import { apiClient } from "api";
import { AUTH } from "constants/constants";

const userRegistration = async (data) => {
    return apiClient(AUTH.REGISTER, {
        method: 'POST',
        body: data, // JSON-объект автоматически сериализуется в apiClient
    });
};

export default userRegistration;