
import { PageHeader,
        Button,
        Header,
} from "components";
import picture from "assets/images/picture.svg";

import "./index.css";

const WelcomePage = () => {
    return (
        <div className="welcome-page__layout">
            <PageHeader />
            <main className="welcome-page__content">
                <Header
                    className="content__header"
                    hdrType="page"
                    text="Добро пожаловать!"    
                />
                <img 
                    className="content__picture"
                    alt="welcome-picture"
                    src={picture}
                />
                <p className="content__text">
                    Какой-то текст
                </p>
                <div className="content__buttons">
                    <Button 
                        text="Создать поездку"
                        btnType="primary"
                    />
                    <Button 
                        text="Изучить сервис"
                        btnType="secondary"
                    />
                </div>
            </main>
        </div>
    );
};

export default WelcomePage;