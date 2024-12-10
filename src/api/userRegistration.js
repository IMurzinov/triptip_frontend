import { AUTH } from "constants/constants";

const userRegistration = async (data) => {
    const response = await fetch(AUTH.REGISTER, {
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

    const result = await response.text();
    return result ? JSON.parse(result) : null;
};

export default userRegistration;