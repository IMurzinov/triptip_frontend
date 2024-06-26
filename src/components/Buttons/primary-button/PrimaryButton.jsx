import React from "react";
import './PrimaryButton.css';

const PrimaryButton = ({ text, onClick, style, className }) => {
    return (
        <button className={`${className}`} style={style} onClick={onClick}>
            {text}
        </button>
    );
};

export default PrimaryButton;