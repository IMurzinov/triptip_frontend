import { apiClient } from "api";
import { AUTH } from "constants/constants";

const userRegistration = async (data) => {
    try {
        return await apiClient(AUTH.REGISTER, {
            method: 'POST',
            body: data, // JSON-объект автоматически сериализуется в apiClient
        });
    } catch (error) {
        throw new Error(error.message || 'Ошибка регистрации');
    }
};

export default userRegistration;