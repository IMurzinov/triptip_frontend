import { AUTH } from "constants/constants";

const auth = async (data) => {

    const formBody = new URLSearchParams({
        grant_type: "password",
        username: data.email,
        password: data.password,
    });

    console.log(formBody.toString());

    const response = await fetch(AUTH.LOGIN, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        credentials: "include",
        body: formBody.toString(),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Неверный логин и/или пароль");
    }

    return response.json();
};

export default auth;