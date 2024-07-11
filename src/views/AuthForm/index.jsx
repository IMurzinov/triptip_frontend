import { useState } from "react";
import { useForm } from "react-hook-form";
import { GoEye, GoEyeClosed } from "react-icons/go";

import { Toggler } from "../index";
import { Button, Header, Input } from '../../components';

import './index.css';

const AuthForm = () => {
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
            // throw new Error();
            console.log(data);
        } catch (error) {
            setError("email", {
                message: "Неверный пароль и/или логин",
            });
        }
    };

    const [passwordIsVisible, setPasswordIsVisible] = useState(false);

    const [formData, setFormData] = useState({
        tel: "",
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        
        setFormData((prevValue) => ({
            ...prevValue,
            [name]: value,
        }))
    };
    
  const [isEmailVisible, setIsEmailVisible] = useState(true);

  const handleToggle = (isEmail) => {
    setIsEmailVisible(isEmail);
  };

    return (
        <div className="auth-form">
            <Header hdrType="page" text="Вход или регистрация" />
            <form
                className="auth-form__data-wrapper"
                name="auth-form"
                action=""
                method=""
                onSubmit={handleSubmit(onSubmit)}
            >
                <div className="auth-form__data">
                    <Toggler
                        isEmailVisible={isEmailVisible}
                        onDataChange={handleToggle}
                    />
                    <div className="form-wrapper">
                        {isEmailVisible ? (
                        <div className="form email-form">
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
                                <div className="password-field-container">
                                    <Input
                                        register={register("password", {
                                            required: "Введите пароль",
                                        })}
                                        label={<Header hdrType="input" text="Пароль"/>}
                                        type={passwordIsVisible ? "text" : "password"}
                                        placeholder="********"
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
                        </div>
                        ) : (
                        <div className="form phone-form">
                            <div className="input-container">
                                <Input
                                    register={register("phone", {
                                        required: "Введите телефон",
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
                                <div className="password-field-container">
                                    <Input
                                        register={register("password", {
                                            required: "Введите пароль",
                                        })}
                                        label={<Header hdrType="input" text="Пароль"/>}
                                        type={passwordIsVisible ? "text" : "password"}
                                        placeholder="********"
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
                        </div>
                        )}
                    </div>
                </div>
                <div className="auth-form__buttons">
                    <Button
                        btnType="primary"
                        text="Войти"
                        disabled={isSubmitting}
                        type="submit"
                    />
                    <Button
                        btnType="secondary"
                        text="Зарегистрироваться"
                        disabled={isSubmitting}
                        type="button"
                    />
                </div>
            </form>
        </div>
    );
};

export default AuthForm;