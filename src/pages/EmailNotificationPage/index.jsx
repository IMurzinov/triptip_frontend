import { Header } from "components";
import logo from "assets/images/logo-v2.svg";

import "./index.css";

const EmailNotificationPage = () => {
    return (
        <div className="notification-page__layout">
            <img src={logo} alt="Trip Tip logo" className="notification-page__logo"/>
            <Header
                className="notification-page__text"
                text="Подтвердите Вашу электронную почту, пройдя по ссылке из письма"
                hdrType="section"
            />
        </div>
    );
};

export default EmailNotificationPage;