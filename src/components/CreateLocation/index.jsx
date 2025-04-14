import { useFormContext } from 'react-hook-form';

import { Header, Input, ImgUploader } from "components";

import "./index.css";

const CreateLocation = ({ index }) => {
    const { register } = useFormContext();

    return (
        <div className="location-container">
            <div className="location-content">
                <Input
                    className="input-field"
                    label={<Header hdrType="input" text="Локация"/>}
                    type="text"
                    placeholder="Введите название города или страны"
                    {...register(`tripElements.${index}.locationName`, { required: true })}
                    autoComplete="off"
                />
                <div className="location-textarea">
                    <label><Header hdrType="input" text="Расскажите самое интересное, что с вами случилось"/></label>
                    <textarea
                        className="text-area"
                        autoСomplete="off"
                        placeholder="И не стесняйтесь!"
                        resize="off"
                        {...register(`tripElements.${index}.locationStory`, { required: true })}
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

export default CreateLocation;