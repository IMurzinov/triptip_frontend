import React from "react";
import './SecondaryButton.css';

const SecondaryButton = ({ text, onClick, style, className, type }) => {
    return (
        <button className={`${className}`} style={style} onClick={onClick} type={type}>
            {text}
        </button>
    );
};

export default SecondaryButton;