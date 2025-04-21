import { useFormContext } from 'react-hook-form';

import { Header, ImgUploader } from "components";

import "./index.css";

const CreateTripRoute = ({ index }) => {
    const { register } = useFormContext();

    return (
        <div className="route-container">
            <div className="route-content">
                <Header
                    text="Маршрут"
                    hdrType="section"
                />
                <div className="location-textarea">
                    <label><Header hdrType="input" text="Расскажите самое интересное, что с вами случилось"/></label>
                    <textarea
                        className="text-area"
                        autoСomplete="off"
                        placeholder="Расскажите, как уехали или приехали в это место, нюансы с транспортом, например, что билет на автобус надо было покупать заранее на сайте или может вам вообще пришлось добираться на собачьей упряжке..."
                        resize="off"
                        {...register(`tripElements.${index}.tripRouteDescription`, { required: true })}
                        autoComplete="off"
                    ></textarea>
                </div>
                <div className="drag-n-drop-area">
                    <div className="drag-n-drop-description">
                        <Header hdrType="input" text="Добавьте фотографии"/>
                        <p className="drag-n-drop-text">
                            Так ваше путешествие привлечет больше внимания пользователей, 
                            а вам будет интереснее возвращаться к воспоминаниям о поездки спустя время
                        </p>
                    </div>
                    <ImgUploader />
                </div>
            </div>
        </div>
    );
};

export default CreateTripRoute;