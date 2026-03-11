import { BiSearch } from "react-icons/bi";
import "./index.css";

const Toggler = ({ options, selectedOption, onOptionChange, variant }) => {

    // Функция для рендера кнопок переключателя
    const renderButton = (option) => {
        const isActive = option.value === selectedOption;

        if (variant === 'tabbar') {
            return (
                <button
                    key={option.value}
                    className={`tabbar-button ${isActive ? 'tabbar-button--active' : 'tabbar-button--inactive'}`}
                    onClick={() => onOptionChange(option.value)}
                >
                    {option.label}
                </button>
            );
        }

        return (
            <button
                key={option.value}
                className={`toggle-button ${isActive ? 'active-button' : ''}`}
                onClick={() => onOptionChange(option.value)}
            >
                {option.label}
            </button>
        );
    };

    if (variant === 'tabbar') {
        return (
            <div className="tabbar">
                <div className="tabbar__buttons">
                    {options.map(renderButton)}
                </div>
                <div className="tabbar__search">
                    <BiSearch className="tabbar__search-icon" />
                    <span className="tabbar__search-text">Поиск</span>
                </div>
            </div>
        );
    }

    return (
        <div className="auth-switcher">
            <div className="toggle-buttons">
                {options.map(renderButton)}
            </div>
        </div>
    );
};

export default Toggler;
