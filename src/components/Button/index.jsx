import classNames from "classnames";

import './index.css';

const Button = ({ text, onClick, style, btnType, type, disabled }) => {
    return (
        <button className={classNames(
            'button',
            {
                'primary-button': btnType === 'primary',
                'secondary-button': btnType === 'secondary',
                'danger-button': btnType === 'danger',
                'disabled-button': disabled,

            }
        )} style={style} onClick={onClick} type={type} aria-disabled={disabled}>
            {text}
        </button>
    );
};

export default Button;