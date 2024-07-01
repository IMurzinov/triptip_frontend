import './index.css';

const Header = ({ text, style, className }) => {
    return (
        <p className={`header ${className}`} style={style}>
            {text}
        </p>
    );
};

export default Header;