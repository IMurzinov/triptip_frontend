import "./index.css";

const Toggler = ({ options, selectedOption, onOptionChange }) => {

    // Функция для рендера кнопок переключателя
    const renderButton = (option) => {
        const isActive = option.value === selectedOption;
        return (
            <button
                key={option.value}
                className={`toggle-button ${isActive ? 'active' : ''}`}
                onClick={() => onOptionChange(option.value)}
            >
                {option.label}
            </button>
        );
    };

    return (
        <div className="auth-switcher">
            <div className="toggle-buttons">
                {options.map(renderButton)}
            </div>
        </div>
    );
};

export default Toggler;