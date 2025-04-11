import classNames from "classnames";

import './index.css';

const Button = ({ text, onClick, style, btnType, type, icon, disabled }) => {
    return (
        <button
            className={classNames(
                'button',
                {
                'primary-button': btnType === 'primary',
                'secondary-button': btnType === 'secondary',
                'danger-button': btnType === 'danger',
                'plain-button': btnType === 'plain',
                }
            )}
            style={style}
            onClick={onClick}
            type={type}
            disabled={disabled}
        >
            { icon && <img className="button-icon" src={icon} alt='button icon'/> }
            <span className="button-text">{text}</span>
        </button>
    );
};

export default Button;