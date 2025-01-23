import triptipInc from "assets/images/triptipInc.svg";
import language from "assets/images/language.svg";

import "./index.css";

const Footer = () => {
    return (
        <footer className="footer">
            <img className="wrights" src={triptipInc} alt="wrihts label"/>
            <nav className="footer__links">
                <p className="text">Конфиденциальность</p>
                <p className="text">Условия</p>
            </nav>
            <div className="footer__language-container">
                <nav className="footer__language">
                    <img className="language" src={language} alt="change language icon"/>
                    <p className="text">РУ</p>
                </nav>
            </div>
        </footer>
    );
};

export default Footer;