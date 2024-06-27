import React from "react";
import './DangerButton.css';

const DangerButton = ({ text, onClick, style, className, type }) => {
    return (
        <button className={`${className}`} style={style} onClick={onClick} type={type}>
            {text}
        </button>
    );
};

export default DangerButton;