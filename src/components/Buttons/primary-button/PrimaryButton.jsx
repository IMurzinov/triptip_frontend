import React from "react";
import './PrimaryButton.css';

const PrimaryButton = ({ text, onClick, style, className, type }) => {
    return (
        <button className={`${className}`} style={style} onClick={onClick} type={type}>
            {text}
        </button>
    );
};

export default PrimaryButton;