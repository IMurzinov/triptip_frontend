import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { GoEye, GoEyeClosed } from "react-icons/go";
import DatePicker from "react-datepicker";

import { Button, Header, Input, Stepper } from "components";
import { userRegistration } from "api";

import "react-datepicker/dist/react-datepicker.css";
import "./index.css";

const SignUpForm = () => {
    const { 
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting, isDirty }, 
        watch,
        trigger,
        clearErrors,
    } = useForm({ mode: "onChange" });

    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({});
    const [passwordIsVisible, setPasswordIsVisible] = useState(false);
    const [dateOfBirth, setDateOfBirth] = useState(null);
    const [isSuccess, setIsSuccess] = useState(false);

    // Шаги для stepper
    const registrationSteps = [
        { label: "Email", description: "Электронная почта" },
        { label: "Данные", description: "Общая информация" },
        { label: "Пароль", description: "Установка пароля" }
    ];

    // Защита от случайного закрытия формы
    useEffect(() => {
        const handleBeforeUnload = (event) => {
            if (isDirty && !isSuccess) {
                event.preventDefault();
                event.returnValue = '';
            }
        }

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [isDirty, isSuccess]);

    const handleNavigation = (path) => {
        if (isDirty && !isSuccess && !window.confirm("Вы действительно хотите покинуть страницу? Несохранённые данные будут потеряны.")) {
            return;
        }
        navigate(path);
    };
    // Валидация и переход на следующий шаг
    const handleNextStep = async () => {
        let fieldsToValidate = [];
        
        if (currentStep === 1) {
            fieldsToValidate = ["email"];
        } else if (currentStep === 2) {
            fieldsToValidate = ["first_name", "last_name", "username"];
        }

        const isValid = await trigger(fieldsToValidate);
        
        if (isValid) {
            // Сохраняем данные текущего шага
            const currentData = {};
            fieldsToValidate.forEach(field => {
                currentData[field] = watch(field);
            });
            
            if (currentStep === 2 && dateOfBirth) {
                currentData.date_of_birth = dateOfBirth.toISOString().split('T')[0];
            }
            
            setFormData(prev => ({ ...prev, ...currentData }));
            setCurrentStep(prev => prev + 1);
            clearErrors();
        }
    };

    const handlePrevStep = () => {
        setCurrentStep(prev => prev - 1);
        clearErrors();
    };

    const onSubmit = async (data) => {
        try {
            // Собираем все данные из формы и сохраненного состояния
            const completeData = {
                ...formData,
                password: data.password,
            };

            // Отправляем запрос на регистрацию
            await userRegistration(completeData);

            // Показываем сообщение об успехе
            setIsSuccess(true);

        } catch (err) {
            console.error("Ошибка регистрации:", err);
            setError("server", { message: err.message });
        }
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        handleSubmit(onSubmit)();
    };

    // Компонент Шага 1: Email
    const renderStep1 = () => (
        <div className={`step-content ${currentStep === 1 ? 'active' : ''}`}>
            <Header hdrType="section" text="Электронная почта" style={{ marginBottom: "24px" }} />
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
                    autoComplete="email"
                />
                <div className="error-message">{errors.email?.message}</div>
            </div>
        </div>
    );

    // Компонент Шага 2: Общие данные
    const renderStep2 = () => (
        <div className={`step-content ${currentStep === 2 ? 'active' : ''}`}>
            <Header hdrType="section" text="Общие данные" style={{ marginBottom: "24px" }} />
            <div className="input-container">
                <Input
                    label={<Header hdrType="input" text="Имя"/>}
                    type="text"
                    placeholder="Иван"
                    {...register("first_name", {
                        required: "Введите имя",
                        validate: (value) => {
                            return /^[a-zA-Zа-яА-ЯёЁ\s]+$/u.test(value) || "Только латиница или кириллица";
                        }
                    })}
                    autoComplete="given-name"
                />
                <div className="error-message">{errors.first_name?.message}</div>
            </div>
            <div className="input-container">
                <Input
                    label={<Header hdrType="input" text="Фамилия"/>}
                    type="text"
                    placeholder="Иванов"
                    {...register("last_name", {
                        required: "Введите фамилию",
                        validate: (value) => {
                            return /^[a-zA-Zа-яА-ЯёЁ]+$/u.test(value) || "Только латиница или кириллица";
                        }
                    })}
                    autoComplete="family-name"
                />
                <div className="error-message">{errors.last_name?.message}</div>
            </div>
            <div className="input-container">
                <Input
                    label={<Header hdrType="input" text="Никнейм"/>}
                    type="text"
                    placeholder="username"
                    {...register("username", {
                        required: "Введите никнейм",
                        validate: (value) => {
                            return /^[A-Za-z@_-]+$/u.test(value) || `Только латиница и символы "@", "-", "_"`;
                        }
                    })}
                    autoComplete="username"
                />
                <div className="error-message">{errors.username?.message}</div>
            </div>
            <div className="input-container">
                <Header hdrType="input" text="Дата рождения"/>
                <DatePicker
                    selected={dateOfBirth}
                    onChange={(date) => setDateOfBirth(date)}
                    dateFormat="dd.MM.yyyy"
                    placeholderText="20.01.1995"
                    showYearDropdown
                    scrollableYearDropdown
                    yearDropdownItemNumber={100}
                    maxDate={new Date()}
                    className="date-picker-input"
                    autoComplete="off"
                />
            </div>
        </div>
    );

    // Компонент Шага 3: Пароль
    const renderStep3 = () => (
        <div className={`step-content ${currentStep === 3 ? 'active' : ''}`}>
            <Header hdrType="section" text="Установка пароля" style={{ marginBottom: "24px" }} />
            <div className="input-container">
                <div className="password-field-container">
                    <Input
                        label={<Header hdrType="input" text="Введите пароль"/>}
                        type={passwordIsVisible ? "text" : "password"}
                        placeholder="********"
                        {...register("password", {
                            required: "Введите пароль",
                            validate: (value) => {
                                return value.length >= 8 || "Пароль должен содержать не менее 8 символов";
                            }
                        })}
                        autoComplete="new-password"
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
                        label={<Header hdrType="input" text="Подтвердите пароль"/>}
                        type={passwordIsVisible ? "text" : "password"}
                        placeholder="********"
                        {...register("confirmPassword", {
                            required: "Подтвердите пароль",
                            validate: (value) => {
                                return value === watch("password") || "Пароли не совпадают";
                            },
                        })}
                        autoComplete="off"
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
            {errors.server && <div className="error-message server-error">{errors.server.message}</div>}
        </div>
    );

    // Компонент успешной регистрации
    const renderSuccess = () => (
        <div className="success-message">
            <Header hdrType="page" text="Регистрация успешна!" />
            <p className="success-text">
                Мы отправили письмо с подтверждением на вашу электронную почту.
                Пожалуйста, проверьте почту и перейдите по ссылке для активации аккаунта.
            </p>
            <Button
                btnType="primary"
                text="Вернуться на главную"
                type="button"
                onClick={() => navigate("/")}
            />
        </div>
    );

    if (isSuccess) {
        return (
            <div className="sign-up-form">
                {renderSuccess()}
            </div>
        );
    }
    
    return (
        <div className="sign-up-form">
            <Header hdrType="page" text="Регистрация" />
            
            <Stepper currentStep={currentStep} steps={registrationSteps} />
            
            <form className="sign-up-form__content" onSubmit={handleFormSubmit}>
                <div className="steps-container">
                    {currentStep === 1 && renderStep1()}
                    {currentStep === 2 && renderStep2()}
                    {currentStep === 3 && renderStep3()}
                </div>

                <div className="sign-up-form__buttons">
                    {currentStep > 1 && (
                        <Button
                            btnType="secondary"
                            text="Назад"
                            type="button"
                            onClick={handlePrevStep}
                            disabled={isSubmitting}
                        />
                    )}
                    
                    {currentStep < 3 ? (
                        <Button
                            btnType="primary"
                            text="Продолжить"
                            type="button"
                            onClick={handleNextStep}
                        />
                    ) : (
                        <Button
                            btnType="primary"
                            text={isSubmitting ? "Отправляю..." : "Зарегистрироваться"}
                            type="submit"
                            disabled={isSubmitting}
                        />
                    )}
                    
                    <Button
                        btnType="plain"
                        text="Отменить"
                        type="button"
                        disabled={isSubmitting}
                        onClick={() => handleNavigation(-1)}
                    />
                </div>
            </form>
        </div>
    );
};

export default SignUpForm;