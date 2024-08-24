import 'components/Input/index.css';

const Input = ({ register, label, type, placeholder, name, value, onChange, autocomplete }) => {
    return (
        <div className="form-input">
            <label className="form-input__label">{label}
                <input
                    {...register}
                    className="form-input__field"
                    type={type}
                    placeholder={placeholder}
                    name={name}
                    value={value}
                    onChange={onChange}
                    autoComplete={autocomplete}
                />
            </label>
        </div>
    );
};

export default Input;