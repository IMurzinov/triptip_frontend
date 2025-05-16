import { Header, Button } from "components";

import "./index.css";

const AddLocation = ({ onAddLocation }) => {
    return (
        <div className="add-location__container">
            <Header
                text="Поехали к следующей остановке!"
                hdrType="section"
            />
            <Button
                text="Добавить остановку"
                btnType="primary"
                onClick={onAddLocation}
                type="button"
            />
        </div>
    );
};

export default AddLocation;