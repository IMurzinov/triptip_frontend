import { Header, Button } from "components";

import "./index.css";

const AddRoute = ({ onAddRoute }) => {
    return (
        <div className="add-route__container">
            <div className="add-route__text-section">
                <Header
                    text="Было интересно по пути?"
                    hdrType="section"
                />
                <p className="add-route__text">Если что-то произошло — расскажите об этом.</p>
            </div>
            <Button
                text="Добавить маршрут"
                btnType="secondary"
                onClick={onAddRoute}
                type="button"
            />
        </div>
    );
};

export default AddRoute;