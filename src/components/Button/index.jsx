const Button = ({ text, onClick, style, className, type }) => {
    return (
        <button className={`button ${className}`} style={style} onClick={onClick} type={type}>
            {text}
        </button>
    );
};

export default Button;