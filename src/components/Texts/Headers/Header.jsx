import React from "react";
import './Header.css';

const Header = ({ text, style, className }) => {
    return (
        <p className={`header ${className}`} style={style}>
            {text}
        </p>
    );
};

export default Header;