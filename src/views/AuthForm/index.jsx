// TODO: Решить проблему с валидацией поля при переключении вкладки тогглера
// TODO: Добавить ссылку "Забыли пароль?"
// TODO: Добавить строку для отображения ошибки в случае неверного пароля и/или логина
// TODO: Добавить маску для ввода телефона

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { GoEye, GoEyeClosed } from 'react-icons/go';

import { Toggler } from 'views';
import { Button, Header, Input } from 'components';

import './index.css';

const AuthForm = () => {

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors, isSubmitting },
    } = useForm({ mode: "onChange" });

    const onSubmit = (data) => {
        console.log(data);
    };

    const [passwordIsVisible, setPasswordIsVisible] = useState(false);
    const [isEmailVisible, setIsEmailVisible] = useState(true);

    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");

    const handleToggle = (isEmail) => {
        if (isEmailVisible) {
            setEmail(watch("email"));
        } else {
            setPhone(watch("phone"));
        }

        setIsEmailVisible(isEmail);

        if (isEmail) {
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

    return (
        <div className="auth-form">
            <Header hdrType="page" text="Вход или регистрация" />
            <form 
                className="auth-form__data-wrapper"
                onSubmit={handleSubmit(onSubmit)}
            >
                <div className="auth-form__data">
                    <Toggler
                        isEmailVisible={isEmailVisible}
                        onDataChange={handleToggle}
                    />
                    <div className="form-wrapper">
                        <div className="form email-form">
                            <div className="input-container">
                                {isEmailVisible ? renderEmailAuth() : renderPhoneAuth()}
                                {<div className="error-message">{isEmailVisible ? errors.email?.message : errors.phone?.message}</div>}
                            </div>
                            <div className="input-container">
                                <div className="password-field-container">
                                    <Input
                                        label={<Header hdrType="input" text="Пароль"/>}
                                        type={passwordIsVisible ? "text" : "password"}
                                        placeholder="********"
                                        {...register("password", { required: false })}
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