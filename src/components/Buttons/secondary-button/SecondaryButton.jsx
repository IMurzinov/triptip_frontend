import React from "react";
import './SecondaryButton.css';

const SecondaryButton = ({ text, onClick, style, className }) => {
    return (
        <button className={`${className}`} style={style} onClick={onClick}>
            {text}
        </button>
    );
};

export default SecondaryButton;