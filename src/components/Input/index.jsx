import React, { forwardRef } from "react";
import "./index.css";

const Input = forwardRef(({ label, type, placeholder, autoComplete, ...props }, ref) => {
  return (
    <div className="form-input">
      <label className="form-input__label">
        {label}
        <input
          ref={ref}
          className="form-input__field"
          type={type}
          placeholder={placeholder}
          autoComplete={autoComplete}
          {...props}
        />
      </label>
    </div>
  );
});

export default Input;