// TODO: Добавить ссылку "Забыли пароль?"
// TODO: Добавить строку для отображения ошибки в случае неверного пароля и/или логина
// TODO: Добавить маску для ввода телефона

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { GoEye, GoEyeClosed } from "react-icons/go";

import { loginSuccess } from "features/auth/authSlice";
import { auth } from "api";
import { Toggler } from "views";
import { Button, Header, Input } from "components";

import "./index.css";

const AuthForm = () => {

    const {
        register,
        unregister,
        handleSubmit,
        setValue,
        watch,
        setError,
        formState: { errors, isSubmitting },
    } = useForm({ mode: "onChange" });

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onSubmit = async (data) => {
        console.log(data);

        try {
            const loginResponse = await auth(data);
            dispatch(loginSuccess({ user: loginResponse.user }));
            navigate(`/profile/${data.username}`);
        } catch (error) {
            console.error("Ошибка:", error.message);

            // Установка ошибки на сервере
            setError("server", { message: error.message || "Произошла ошибка" });
        }
    };
    
    const fields = ["email", "phone", "password"];
    
    const handleFormSubmit = (e) => {
        if (e.nativeEvent.submitter && e.nativeEvent.submitter.classList.contains("toggle-button")) {
            e.preventDefault();
        } else {
            fields.forEach((field) => {
                if (!watch(field)) {
                    unregister(field);
                }
            })
            handleSubmit(onSubmit)(e);
        }
    };

    const [passwordIsVisible, setPasswordIsVisible] = useState(false);
    const [selectedOption, setSelectedOption] = useState("email");

    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");

 

    const handleToggle = (option) => {
        if (selectedOption === "email") {
            setEmail(watch("email"));
        } else {
            setPhone(watch("phone"));
        }

        setSelectedOption(option);

        if (option === "email") {
            setValue("email", email);
            setValue("phone", ""); // Очищаем phone при переключении на email
        } else {
            setValue("phone", phone);
            setValue("email", ""); // Очищаем email при переключении на phone
        }
    };

    const renderEmailAuth = () => {
        return (
            <Input
                label={<Header hdrType="input" text="Электронная почта"/>}
                type="email"
                placeholder="something@smth.com"
                {...register("email", {
                    required: false,
                    validate: (value) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value) || "Введите корректный email",
                })}
                autoComplete="email"
            />
        );
    };

    const renderPhoneAuth = () => {
        return (
            <Input
                label={<Header hdrType="input" text="Телефон"/>}
                type="tel"
                placeholder="+7(XXX)XXX-XX-XX"
                {...register("phone", {
                    required: false,
                    validate: (value) => /^(\+)?[0-9]+$/.test(value) || "Введите корректный номер телефона",
                })}
                autoComplete="tel"
            />
        );
    };

    const options = [
        { label: 'По номеру телефона', value: 'phone' },
        { label: 'По электронной почте', value: 'email' },
    ];

    return (
        <div className="auth-form">
            <Header hdrType="page" text="Вход или регистрация" />
            <form 
                className="auth-form__data-wrapper"
                onSubmit={handleFormSubmit}
            >
                <div className="auth-form__data">
                    <Toggler
                        options={options}
                        selectedOption={selectedOption}
                        onOptionChange={handleToggle}
                    />
                    <div className="form-wrapper">
                        <div className="form email-form">
                            <div className="input-container">
                                {selectedOption === "email" ? renderEmailAuth() : renderPhoneAuth()}
                                {<div className="error-message">{selectedOption === "email" ? errors.email?.message : errors.phone?.message}</div>}
                            </div>
                            <div className="input-container">
                                <div className="password-field-container">
                                    <Input
                                        label={<Header hdrType="input" text="Пароль"/>}
                                        type={passwordIsVisible ? "text" : "password"}
                                        placeholder="********"
                                        {...register("password", { required: "Введите пароль" })}
                                        autoComplete="current-password"
                                    />
                                    <div
                                        className="show-hide-icon"
                                        onClick={() => setPasswordIsVisible(!passwordIsVisible)}
                                        aria-label={passwordIsVisible ? "Скрыть пароль" : "Показать пароль"}
                                    >
                                        {passwordIsVisible ? <GoEyeClosed /> : <GoEye />}
                                    </div>
                                </div>
                                {<div className="error-message">{errors.password?.message}</div>}
                            </div>    
                        </div>
                    </div>
                </div>
                <div className="auth-form__buttons">
                    <Button
                        btnType="primary"
                        text={isSubmitting ? "Загрузка..." : "Войти"}
                        disabled={isSubmitting}
                        type="submit"
                    />
                    <Link className="link" to="/register">
                        <Button
                            btnType="secondary"
                            text="Зарегистрироваться"
                            disabled={isSubmitting}
                            type="button"
                        />
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default AuthForm;