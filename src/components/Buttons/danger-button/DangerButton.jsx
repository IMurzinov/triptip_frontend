import React from "react";
import './DangerButton.css';

const DangerButton = ({ text, onClick, style, className }) => {
    return (
        <button className={`${className}`} style={style} onClick={onClick}>
            {text}
        </button>
    );
};

export default DangerButton;