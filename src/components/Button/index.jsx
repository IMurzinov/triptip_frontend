import './index.css';

const Button = ({ text, onClick, style, className, type, disabled }) => {
    return (
        <button className={`button ${className}`} style={style} onClick={onClick} type={type} aria-disabled={disabled}>
            {text}
        </button>
    );
};

export default Button;