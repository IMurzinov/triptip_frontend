import { useNavigate } from "react-router-dom";
import { Button, Header } from "components";
import NotFoundGoose from "assets/images/goose404.svg";

import "./index.css";

const NotFoundPage = () => {
    const navigate = useNavigate();

    return (
        <div className='not-found-page'>
            <div className="not-found-page__content">
                <img src={NotFoundGoose} alt="404 Not Found" />
                <Header
                    hdrType="page"
                    text="Ошибка"
                />
                <p className="not-found-page__text">Неправильно набран адрес, или такой страницы на сайте больше не существует</p>
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

export default NotFoundPage;