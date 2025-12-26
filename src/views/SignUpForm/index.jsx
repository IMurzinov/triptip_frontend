// TODO: Добавить подсказку по вводу пароля, индикацию силы пароля.
// TODO: Добавить проверку на занятость email и имени
// TODO: Добавить маску для телефона
// TODO: Убрать все ненужные console.log()

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { GoEye, GoEyeClosed } from "react-icons/go";

import { loginSuccess } from "features/auth/authSlice";
import { Button, Header, Input } from "components";
import { userRegistration, auth } from "api";

import "./index.css";

const SignUpForm = () => {
    const { 
        register,
        unregister,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting, isDirty }, 
        watch,
        trigger,
    } = useForm({ mode: "onChange" });

    // navigate, handleNavigation и useEffect для создания уведомления
    // о потере данных в случае закрытия окна без отправки формы

    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    // Stepper state - tracks current step but doesn't display visually
    const [currentStep, setCurrentStep] = useState(1);

    const handleNavigation = (path) => {
        if (isDirty && !window.confirm("Вы действительно хотите покинуть страницу? Несохранённые данные будут потеряны.")) {
            return;
        }
        navigate(path);
    };

    useEffect(() => {
        const handleBeforeUnload = (event) => {
            if (isDirty) {
                event.preventDefault();
                event.returnValue = '';
            }
        }

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };

    },  [isDirty]);

    const fields = ["first_name", "last_name", "username", "email", "dob"];

    const handleFormSubmit = (e) => {
        e.preventDefault();

        fields.forEach((field) => {
            if (!watch(field)) {
                unregister(field);
            }
        })

        unregister("confirmPassword");
        
        handleSubmit(onSubmit)();
    };

    const onSubmit = async (data) => {

        try {
            // Регистрация
            const result = await userRegistration(data);

            // Авторизация
            // const loginResponse = await auth(data);

            // Обновление состояния authSlice
            // dispatch(loginSuccess({ user: loginResponse.user_data }));
            
            // Перенаправление
            navigate(`/emailnotification`);

        } catch (err) {
            console.error("Ошибка регистрации:", err);

            // Устанавливаем ошибку в форму
            setError("server", { message: err.message });
        }
    };

    const [passwordIsVisible, setPasswordIsVisible] = useState(false);
    
    // Navigation between steps with validation
    const handleNextStep = async () => {
        let fieldsToValidate = [];
        
        if (currentStep === 1) {
            fieldsToValidate = ["email"];
        } else if (currentStep === 2) {
            fieldsToValidate = ["username", "dob"];
        }
        
        const isValid = await trigger(fieldsToValidate);
        
        if (isValid) {
            setCurrentStep(currentStep + 1);
        }
    };
    
    return (
        <form
            className="sign-up-form"
            onSubmit={handleFormSubmit}
        >
            <div className="sign-up-form__header">
                <Header hdrType="page" text="Регистрация" />
                {currentStep === 1 && (
                    <p className="sign-up-form__description">
                        Ваша почта, которая будет использоваться для входа в аккаунт
                    </p>
                )}
                {currentStep === 2 && (
                    <p className="sign-up-form__description">
                        Заполните общую информацию
                    </p>
                )}
                {currentStep === 3 && (
                    <p className="sign-up-form__description">
                        Создайте пароль
                    </p>
                )}
            </div>
            
            {/* Step 1: Email */}
            {currentStep === 1 && (
                <div className="sign-up-form__step">
                    <div className="input-container">
                        <Input
                            label={<Header hdrType="input" text="Электронная почта"/>}
                            type="email"
                            placeholder="something@smth.com"
                            {...register("email", {
                                required: "Введите email",
                                validate: (value) => {
                                    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value) || "Введите корректный email";
                                }
                            })}
                            autoСomplete="email"
                        />
                        <div className="error-message">{errors.email?.message}</div>
                    </div>
                    <div className="sign-up-form__buttons">
                        <Button
                            btnType="primary"
                            text="Продолжить"
                            type="button"
                            onClick={handleNextStep}
                        />
                    </div>
                </div>
            )}
            
            {/* Step 2: Personal Information */}
            {currentStep === 2 && (
                <div className="sign-up-form__step">
                    <div className="input-container">
                        <Input
                            label={<Header hdrType="input" text="Имя"/>}
                            type="text"
                            placeholder="Иван"
                            {...register("first_name", {
                                validate: (value) => {
                                    return /^[a-zA-Zа-яА-ЯёЁ\s]+$/u.test(value) || "Только латиница или кириллица";
                                }
                            })}
                            autoСomplete="given-name"
                        />
                        <div className="error-message">{errors.first_name?.message}</div>
                    </div>
                    <div className="input-container">
                        <Input
                            label={<Header hdrType="input" text="Фамилия"/>}
                            type="text"
                            placeholder="Иванов"
                            {...register("last_name", {
                                validate: (value) => {
                                    return /^[a-zA-Zа-яА-ЯёЁ]+$/u.test(value) || "Только латиница или кириллица";
                                }
                            })}
                            autoСomplete="family-name"
                        />
                        <div className="error-message">{errors.last_name?.message}</div>
                    </div>
                    <div className="input-container">
                        <Input
                            label={<Header hdrType="input" text="Дата рождения"/>}
                            type="date"
                            placeholder="20.01.1995"
                            {...register("dob", {
                                required: "Введите дату рождения",
                            })}
                            autoСomplete="bday"
                        />
                        <div className="error-message">{errors.dob?.message}</div>
                    </div>
                    <div className="input-container">
                        <Input
                            label={<Header hdrType="input" text="Имя пользователя"/>}
                            type="text"
                            placeholder="username"
                            {...register("username", {
                                required: "Введите имя пользователя",
                                validate: (value) => {
                                    return /^[A-Za-z@_-]+$/u.test(value) || `Только латиница и символы "@", "-", "_"`;
                                }
                            })}
                            autoСomplete="username"
                        />
                        <div className="error-message">{errors.username?.message}</div>
                    </div>
                    <div className="sign-up-form__buttons">
                        <Button
                            btnType="primary"
                            text="Продолжить"
                            type="button"
                            onClick={handleNextStep}
                        />
                    </div>
                </div>
            )}
            
            {/* Step 3: Password Creation */}
            {currentStep === 3 && (
                <div className="sign-up-form__step">
                    <div className="input-container">
                        <div className="password-field-container">
                            <Input
                                label={<Header hdrType="input" text="Введите пароль"/>}
                                type={passwordIsVisible ? "text" : "password"}
                                placeholder=""
                                {...register("password", {
                                    required: "Введите пароль",
                                    validate: (value) => {
                                        return value.length >= 8 || "Пароль должен содержать не менее 8 символов";
                                    }
                                })}
                                autoСomplete="new-password"
                            />
                            <div 
                                className="show-hide-icon"
                                onClick={() => setPasswordIsVisible(!passwordIsVisible)}
                                aria-label={passwordIsVisible ? "Скрыть пароль" : "Показать пароль"}
                            >
                                {passwordIsVisible ? <GoEyeClosed /> : <GoEye />}
                            </div>
                        </div>
                        <div className="error-message">{errors.password?.message}</div>
                    </div>
                    <div className="input-container">
                        <div className="password-field-container">
                            <Input
                                label={<Header hdrType="input" text="Повторите пароль"/>}
                                type={passwordIsVisible ? "text" : "password"}
                                placeholder=""
                                {...register("confirmPassword", {
                                    required: "Подтвердите пароль",
                                    validate: (value) => {
                                        return value === watch("password") || "Пароли не совпадают";
                                    }, 
                                })}
                                autoСomplete="off"
                            />
                            <div 
                                className="show-hide-icon"
                                onClick={() => setPasswordIsVisible(!passwordIsVisible)}
                                aria-label={passwordIsVisible ? "Скрыть пароль" : "Показать пароль"}
                            >
                                {passwordIsVisible ? <GoEyeClosed /> : <GoEye />}
                            </div>
                        </div>
                        <div className="error-message">{errors.confirmPassword?.message}</div>
                        {errors.server && ( <div className="error-message">{errors.server.message}</div> )}
                    </div>
                    <div className="sign-up-form__buttons">
                        <Button
                            btnType="primary"
                            text={isSubmitting ? "Отправляю..." : "Зарегистрироваться"}
                            type="submit"
                            disabled={isSubmitting}
                        />
                    </div>
                </div>
            )}
        </form>
    );
};

export default SignUpForm;