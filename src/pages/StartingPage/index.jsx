import { Link } from "react-router-dom";

import { TripList } from "views";
import { PageHeader, Button, Header } from "components";

import 'pages/StartingPage/index.css';

const StartingPage = () => {

// TODO: Настроить корректный скролл на список поездок

    function scrollTo() {
        const elem = document.querySelector('.starting-page__top-trips');

        if (elem) {
            elem.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <div className="starting-page__layout">
            <PageHeader />
            <main className="starting-page__content">
                <div className="starting-page__welcome-container">
                    <div className="starting-page__welcome-text">
                        <p className="starting-page__mojo">
                            Открой для себя новые места<br/>
                            и создавай незабываемые маршруты<br/>
                            вместе с нами!
                        </p>
                        <p className="starting-page__description">
                            TripTip — это ваш персональный путеводитель, где можно легко хранить<br/>
                            и делиться впечатлениями о путешествиях.
                        </p>
                    </div>
                    <div className="starting-page__buttons">
                        <Link className="link" to="/register">
                            <Button
                                btnType="primary"
                                text="Зарегистрироваться"
                                type="button"
                            />
                        </Link>
                        <Button
                            btnType="secondary"
                            text="Посмотреть путешествия"
                            type="button"
                            onClick={scrollTo}
                        />
                    </div>
                </div>
                <div className="starting-page__top-trips">
                    {/* TODO: Добавить компонент списка топ-поездок с отображением автора, лайков и комментов */}
                </div>
            </main>
        </div>
    )
};

export default StartingPage;