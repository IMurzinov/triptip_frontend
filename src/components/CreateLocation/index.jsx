import drag from "assets/images/drag.svg";
import { Header, Input } from "components";

import "./index.css";

const CreateLocation = () => {
    return (
        <div className="location-container">
            <img src={drag} className="drag-icon" alt="drag icon" />
            <div className="location-content">
                <Header
                    text="Первая остановка"
                    hdrType="section"
                />
                <Input
                    className="input-field"
                    label={<Header hdrType="input" text="Локация"/>}
                    type="text"
                    placeholder="Введите название города или страны"
                />
                <div className="location-textarea">
                    <label><Header hdrType="input" text="Расскажите самое интересное, что с вами случилось"/></label>
                    <textarea
                        className="text-area"
                        autocomplete="off"
                        placeholder="И не стесняйтесь!"
                        resize="off"
                    ></textarea>
                </div>
                <div className="drag-n-drop-area">
                    <div className="drag-n-drop-description">
                        <Header hdrType="input" text="Добавьте фотографии"/>
                        <p className="text">
                            Так ваше путешествие привлечет больше внимания пользователей, 
                            а вам будет интереснее возвращаться к воспоминаниям о поездки спустя время
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateLocation;