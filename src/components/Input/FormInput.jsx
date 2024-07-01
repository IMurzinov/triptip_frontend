import React from "react";
import './FormInput.css';

const FormInput = ({ label, type, placeholder, name, value, onChange, autocomplete }) => {
    return (
        <div className="form-input">
            <label className="form-input__label">{label}
                <input
                    className="form-input__field"
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