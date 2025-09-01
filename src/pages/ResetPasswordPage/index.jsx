import { Header } from "components";
import logo from "assets/images/logo-v2.svg";

import "./index.css";

const ResetPasswordPage = () => {
    return (
        <div className="reset-password__layout">
            <img src={logo} alt="Trip Tip logo" className="reset-password__logo"/>
            <Header
                className="reset-password__text"
                text="Ссылка на восстановление пароля отправлена на вашу почту"
                hdrType="section"
            />
        </div>
    );
};

export default ResetPasswordPage;