import React from "react";
import './FormInput.css';

const FormInput = ({ label, type, placeholder, name, value, onChange, autocomplete }) => {
    return (
        <div className="formInput">
            <label className="formInput__label">{label}
                <input
                    className="formInput__field"
                    type={type}
                    placeholder={placeholder}
                    name={name}
                    value={value}
                    onChange={onChange}
                    autoComplete={autocomplete}
                    required
                />
            </label>
        </div>
    );
};

export default FormInput;