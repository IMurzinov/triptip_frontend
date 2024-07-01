import { useState } from "react";

import { Toggler } from "../index";
import { Button, Header, Input } from '../../components';

import './index.css';

const AuthForm = () => {

    const [formData, setFormData] = useState({
        tel: "",
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
    
  const [isEmailVisible, setIsEmailVisible] = useState(true);

  const handleToggle = (isEmail) => {
    setIsEmailVisible(isEmail);
  };

    return (
        <div className="auth-form">
            <Header className="page-header" text="Вход или регистрация" />
            <form className="auth-form__data-wrapper">
                <div className="auth-form__data">
                    <Toggler
                        isEmailVisible={isEmailVisible}
                        onDataChange={handleToggle}
                    />
                    <div className="form-wrapper">
                        {isEmailVisible ? (
                        <div className="form email-form">
                            <Input
                                label={<Header className="form-header" text="Электронная почта"/>}
                                type="email"
                                placeholder="something@smth.com"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                autocomplete="email"
                                required
                            />
                            <Input
                                label={<Header className="form-header" text="Пароль"/>}
                                type="password"
                                placeholder="********"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                autocomplete="off"
                                required
                            />
                        </div>
                        ) : (
                        <div className="form phone-form">
                            <Input
                                label={<Header className="form-header" text="Телефон"/>}
                                type="tel"
                                placeholder="+7(XXX)XXX-XX-XX"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                autocomplete="tel"
                                required
                            />
                            <Input
                                label={<Header className="form-header" text="Пароль"/>}
                                type="password"
                                placeholder="********"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                autocomplete="off"
                                required
                            />
                        </div>
                        )}
                    </div>
                </div>
                <div className="auth-form__buttons">
                    <Button
                        className="primary-button"
                        text="Войти"
                        onClick={() => { console.log('primaryButton click') }}
                        type="submit"
                    />
                    <Button
                        className="secondary-button"
                        text="Зарегистрироваться"
                        onClick={() => { console.log('secondaryButton click') }}
                        type="button"
                    />
                </div>
            </form>
        </div>
    );
};

export default AuthForm;