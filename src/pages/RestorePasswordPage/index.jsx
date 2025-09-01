import { Header } from "components";
import logo from "assets/images/logo-v2.svg";

import "./index.css";

const RestorePasswordPage = () => {
    return (
        <div className="notification-page__layout">
            <img src={logo} alt="Trip Tip logo" className="notification-page__logo"/>
            <Header
                className="notification-page__text"
                text="Ссылка на восстановление пароля отправлена на вашу почту"
                hdrType="section"
            />
        </div>
    );
};

export default RestorePasswordPage;