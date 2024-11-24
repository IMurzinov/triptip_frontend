import { URL } from "constants/constants";

const userRegistration = async (data) => {
    const response = await fetch(URL.REGISTER, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Ошибка регистрации");
    }

    return response.json();
};

export default userRegistration;