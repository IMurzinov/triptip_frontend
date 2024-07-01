import AuthSwitcher from "./AuthSwitcher";
import { Button, Header } from '../../index';

import './AuthForm.css';

const AuthForm = () => {    
    return (
        <div className="auth-form">
            <Header className="page-header" text="Вход или регистрация" />
            <form className="auth-form__data-wrapper">
                <div className="auth-form__data">
                    <AuthSwitcher />
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