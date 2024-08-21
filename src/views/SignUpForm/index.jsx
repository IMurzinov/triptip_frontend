import { useState } from "react";
import { useForm } from "react-hook-form";
import { GoEye, GoEyeClosed } from "react-icons/go";

import { Button, Header, Input } from '@components';

import '@root/index.css';

const SignUpForm = () => {
    const { 
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm();

    const onSubmit = async (data) => {
        try {
            // setTimeout имитирует задержку ответа сервера для теста кнопки disabled
            await new Promise((resolve) => setTimeout(resolve, 1000));
            // Позднее throw new Error() необходимо заменить на обработку ответа сервера и только в определенных случаях вызывать ошибку setError
            // throw new Error();
            console.log(data); 
        } catch (error) {
            setError("email", {
                message: "Этот адрес электронной почты уже зарегистрирован",
            });
        }
    };

    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        email: '',
        phone: '',
        dob: '',
        password: '',
        confirmPassword: '',
    });

    const [passwordIsVisible, setPasswordIsVisible] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevValue) => ({
            ...prevValue,
            [name]: value,
        }));
    };
    
    return (
        <form
            className="sign-up-form"
            name="sign-up-form"
            action=""
            method="post"
            onSubmit={handleSubmit(onSubmit)}
        >
            <Header hdrType="page" text="Регистрация" />
            <div className="sign-up-form__personal-data">
                <Header hdrType="section" text="Общая информация" style={{ marginBottom: "4px" }} />
                <div className="input-container">
                    <Input
                        register={register("name", {
                            required: "Введите имя",
                            pattern: {
                                value: /^[a-zA-Zа-яА-ЯёЁ]+$/,
                                message: "Только латиница или кириллица"
                            }
                        })}
                        label={<Header hdrType="input" text="Имя"/>}
                        type="text"
                        placeholder="Иван"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        autocomplete="given-name"
                    />
                    {errors.name && <div className="error-message">{errors.name.message}</div>}
                </div>
                <div className="input-container">
                    <Input
                        register={register("surname", {
                            required: "Введите фамилию",
                            pattern: {
                                value: /^[a-zA-Zа-яА-ЯёЁ]+$/,
                                message: "Только латиница или кириллица"
                            }
                        })}
                        label={<Header hdrType="input" text="Фамилия"/>}
                        type="text"
                        placeholder="Иванов"
                        name="surname"
                        value={formData.surname}
                        onChange={handleChange}
                        autocomplete="family-name"
                    />
                    {errors.surname && <div className="error-message">{errors.surname.message}</div>}
                </div>
                <div className="input-container">
                    <Input
                        register={register("email", {
                            required: "Введите email",
                        })}
                        label={<Header hdrType="input" text="Электронная почта"/>}
                        type="email"
                        placeholder="something@smth.com"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        autocomplete="email"
                    />
                    {errors.email && <div className="error-message">{errors.email.message}</div>}
                </div>
                <div className="input-container">
                    <Input
                        register={register("phone", {
                            required: "Введите номер телефона",
                        })}
                        label={<Header hdrType="input" text="Телефон"/>}
                        type="tel"
                        placeholder="+7(XXX)XXX-XX-XX"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        autocomplete="tel"
                    />
                    {errors.phone && <div className="error-message">{errors.phone.message}</div>}
                </div>
                <div className="input-container">
                    <Input
                        register={register("dob", {
                            required: "Введите дату рождения",
                        })}
                        label={<Header hdrType="input" text="Дата рождения"/>}
                        type="date"
                        placeholder="20.01.1995"
                        name="dob"
                        value={formData.dob}
                        onChange={handleChange}
                        autocomplete="off"
                    />
                    {errors.dob && <div className="error-message">{errors.dob.message}</div>}
                </div>
            </div>
            <div className="sign-up-form__password">
                <Header className="section-header" text="Создание пароля" style={{ marginBottom: "4px" }} />
                <div className="input-container">
                    <div className="password-field-container">
                        <Input
                            register={register("password", {
                                required: "Введите пароль",
                                minLength: {
                                    value: 8,
                                    message: "Пароль должен содержать не менее 8 символов"
                                }
                            })}
                            label={<Header hdrType="input" text="Введите пароль"/>}
                            type={passwordIsVisible ? "text" : "password"}
                            placeholder=""
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            autocomplete="off"
                        />
                        <div 
                            className="show-hide-icon"
                            onClick={() => setPasswordIsVisible(!passwordIsVisible)}
                        >
                            {passwordIsVisible ? <GoEyeClosed /> : <GoEye />}
                        </div>
                    </div>
                    {errors.password && <div className="error-message">{errors.password.message}</div>}
                </div>
                <div className="input-container">
                    <div className="password-field-container">
                        <Input
                            register={register("confirmPassword", {
                                required: "Подтвердите пароль",
                                validate: (value) => {
                                    if (formData.password === value) {
                                        return true;
                                    }
                                    return "Пароли не совпадают";
                                }, 
                            })}
                            label={<Header hdrType="input" text="Повторите пароль"/>}
                            type={passwordIsVisible ? "text" : "password"}
                            placeholder=""
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            autocomplete="off"
                        />
                        <div 
                            className="show-hide-icon"
                            onClick={() => setPasswordIsVisible(!passwordIsVisible)}
                        >
                            {passwordIsVisible ? <GoEyeClosed /> : <GoEye />}
                        </div>
                    </div>
                    {errors.confirmPassword && <div className="error-message">{errors.confirmPassword.message}</div>}
                </div>    
            </div>
            <div className="sign-up-form__buttons">
                <Button
                    disabled={isSubmitting}
                    btnType="primary"
                    text="Зарегистрироваться"
                    type="submit"
                />
                <Button
                    disabled={isSubmitting}
                    btnType="secondary"
                    text="Отменить"
                    type="button"
                />
            </div>
        </form>
    );
};

export default SignUpForm;