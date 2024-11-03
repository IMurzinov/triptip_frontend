// TODO: Добавить подсказку по вводу пароля, индикацию силы пароля.
// TODO: Добавить проверку на занятость email и имени
// TODO: Добавить маску для телефона

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { GoEye, GoEyeClosed } from 'react-icons/go';

import { Button, Header, Input } from 'components';

import './index.css';

const SignUpForm = () => {
    const { 
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting, isDirty }, 
        watch,
    } = useForm({ mode: "onChange" });

    // navigate, handleNavigation и useEffect для создания уведомления
    // о потере данных в случае закрытия окна без отправки формы

    const navigate = useNavigate();

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

    const onSubmit = (data) => {
        console.log(data);
    };

    const [passwordIsVisible, setPasswordIsVisible] = useState(false);
    
    return (
        <form
            className="sign-up-form"
            onSubmit={handleSubmit(onSubmit)}
        >
            <Header hdrType="page" text="Регистрация" />
            <div className="sign-up-form__personal-data">
                <Header hdrType="section" text="Общая информация" style={{ marginBottom: "4px" }} />
                <div className="input-container">
                    <Input
                        label={<Header hdrType="input" text="Имя"/>}
                        type="text"
                        placeholder="Иван"
                        {...register("name", {
                            required: "Введите имя",
                            validate: (value) => {
                                return /^[a-zA-Zа-яА-ЯёЁ\s]+$/u.test(value) || "Только латиница или кириллица";
                                }
                            }
                        )}
                        autocomplete="given-name"
                    />
                    <div className="error-message">{errors.name?.message}</div>
                </div>
                <div className="input-container">
                    <Input
                        label={<Header hdrType="input" text="Фамилия"/>}
                        type="text"
                        placeholder="Иванов"
                        {...register("surname", {
                            required: "Введите фамилию",
                            validate: (value) => {
                                return /^[a-zA-Zа-яА-ЯёЁ]+$/u.test(value) || "Только латиница или кириллица";
                                }
                            }
                        )}
                        autocomplete="family-name"
                    />
                    <div className="error-message">{errors.surname?.message}</div>
                </div>
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
                            }
                        )}
                        autocomplete="email"
                    />
                    <div className="error-message">{errors.email?.message}</div>
                </div>
                <div className="input-container">
                    <Input
                        label={<Header hdrType="input" text="Телефон"/>}
                        type="tel"
                        placeholder="+7(XXX)XXX-XX-XX"
                        {...register("phone", {
                            required: "Введите номер телефона",
                            validate: (value) => {
                                return /^(\+)?[0-9]+$/.test(value) || "Введите корректный номер телефона";
                                }
                            }
                        )}
                        autocomplete="tel"
                    />
                    <div className="error-message">{errors.phone?.message}</div>
                </div>
                <div className="input-container">
                    <Input
                        label={<Header hdrType="input" text="Дата рождения"/>}
                        type="date"
                        placeholder="20.01.1995"                    
                        {...register("dob", {
                            required: "Введите дату рождения",
                            }
                        )}
                        autocomplete="off"
                    />
                    <div className="error-message">{errors.dob?.message}</div>
                </div>
            </div>
            <div className="sign-up-form__password">
                <Header className="section-header" text="Создание пароля" style={{ marginBottom: "4px" }} />
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
                                }
                            )}
                            autocomplete="new-password"
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
                                }
                            )}
                            autocomplete="off"
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
                </div>    
            </div>
            <div className="sign-up-form__buttons">
                <Button
                    btnType="primary"
                    text={isSubmitting ? "Отправляю..." : "Зарегистрироваться"}
                    type="submit"
                    disabled={isSubmitting}
                />
                <Button
                    btnType="secondary"
                    text="Отменить"
                    type="button"
                    disabled={isSubmitting}
                    onClick={() => handleNavigation(-1)}
                />
            </div>
        </form>
    );
};

export default SignUpForm;