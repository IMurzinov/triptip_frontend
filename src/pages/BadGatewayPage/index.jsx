import { useNavigate } from "react-router-dom";
import { Button, Header } from "components";
import BadGatewayGoose from "assets/images/goose502.svg";
import PlaneUp from "assets/images/plane-up.svg";
import PlaneDown from "assets/images/plane-down.svg";

import "./index.css";

const BadGatewayPage = () => {
    const navigate = useNavigate();

    return (
        <div className='badgateway-page'>
            <img
                className="plane-up"
                src={PlaneUp}
                alt="Plane Up"
            />
            <img
                className="plane-down"
                src={PlaneDown}
                alt="Plane Down"
            />
            <div className="badgateway-page__content">
                <img src={BadGatewayGoose} alt="502 Bad Gateway" />
                <Header
                    hdrType="page"
                    text="Ошибка"
                />
                <div className="badgateway-page__text">
                    <p>Сервер временно недоступен,</p>
                    <p>попробуйте зайти чуть позже</p>
                </div>
                <Button
                    btnType="primary"
                    text="На главную"
                    onClick={() => {
                        navigate("/");
                    }}
                />
            </div>
        </div>
    );
};

export default BadGatewayPage;