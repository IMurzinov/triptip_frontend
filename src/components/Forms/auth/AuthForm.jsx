import React from "react";
import './AuthForm.css';
import Header from '../../Texts/Headers/Header';
import PrimaryButton from '../../Buttons/primary-button/PrimaryButton';
import SecondaryButton from '../../Buttons/secondary-button/SecondaryButton';
import AuthSwitcher from "./AuthSwitcher";

const AuthForm = () => {    
    return (
        <div className="auth-form">
            <Header className="page-header" text="Вход или регистрация" />
            <div className="auth-form__data">
                <AuthSwitcher />
            </div>
            <div className="auth-form__buttons">
                <PrimaryButton
                    className="primary-button"
                    text="Войти"
                    onClick={() => { console.log('primaryButton click') }}
                    type="submit"
                />
                <SecondaryButton
                    className="secondary-button"
                    text="Зарегистрироваться"
                    onClick={() => { console.log('secondaryButton click') }}
                    type="button"
                />
            </div>
        </div>
    );
};

export default AuthForm;