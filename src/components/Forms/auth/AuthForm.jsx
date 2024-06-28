import React, { useState } from "react";
import './AuthForm.css';
import Header from '../../Texts/Headers/Header';
import FormInput from '../../Inputs/FormInput';
import PrimaryButton from '../../Buttons/primary-button/PrimaryButton';
import SecondaryButton from '../../Buttons/secondary-button/SecondaryButton';

const AuthForm = ({}) => {
    const [formData, setFormData] = useState({
        tel: "",
        email: "",
        password: "",
    });

    const [isEmailVisible, setIsEmailVisible] =useState(true);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const toggleInput = () => {
        setIsEmailVisible(!isFirstVisible);
    };
        
    return (
        <div className="auth-form">
            
        </div>
    );
};

export default AuthForm;