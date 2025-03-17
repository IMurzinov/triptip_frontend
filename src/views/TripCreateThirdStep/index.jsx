import { useState } from "react";

import { Header, Button } from "components";

import "./index.css";

const ThirdStep = ({ onTripSubmit, onTripDraftSave, onPrevStep }) => {
    const [step, setStep] = useState('third');

    const goToSecondStep = () => {
        onPrevStep();
        setStep('second');
    }

    return (
        <div className="third-step-container">
            {/* <div className="third-step__tags-discription">
                <Header
                    hdrType="input"
                    text="Теги"
                />
                <span className="tags-discription__text">
                    Выберите теги, которые описывают вашу поездку, 
                    чтобы пользователя было легко ее найти. 
                    Но лучше не выбирать больше 5.
                </span>
            </div>
            <div className="third-step__tags">
                <Button
                    btnType="plain"
                    text="Экскурсии"
                />
                <Button
                    btnType="plain"
                    text="Шоппинг"
                />
                <Button
                    btnType="plain"
                    text="Культура"
                />
                <Button
                    btnType="plain"
                    text="Сельская местность"
                />
                <Button
                    btnType="plain"
                    text="Город"
                />
                <Button
                    btnType="plain"
                    text="Пляж"
                />
                <Button
                    btnType="plain"
                    text="Зима"
                />
                <Button
                    btnType="plain"
                    text="Горы"
                />
                <Button
                    btnType="plain"
                    text="Лето"
                />
                <Button
                    btnType="plain"
                    text="Активный отдых"
                />
                <Button
                    btnType="plain"
                    text="Удивило"
                />
                <Button
                    btnType="plain"
                    text="Расслабляюще"
                />
            </div> */}
            <div className="third-step__buttons">
                <Button
                    btnType="secondary"
                    text="Назад"
                    onClick={goToSecondStep}
                />
                <Button
                    btnType="secondary"
                    text="Сохранить как черновик"
                />
                <Button
                    btnType="primary"
                    text="Опубликовать"
                    type="submit"
                />
            </div>
        </div>
    );
};

export default ThirdStep;