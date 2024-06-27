import React, { useState } from "react";
import './SignUpForm.css';
import FormInput from '../../Inputs/FormInput';
import Header from '../../Texts/Headers/Header';
import PrimaryButton from "../../Buttons/primary-button/PrimaryButton";
import SecondaryButton from "../../Buttons/secondary-button/SecondaryButton";

const SignUpForm = ({}) => {
    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        email: '',
        phone: '',
        dob: '',
        password: '',
        confirmPassword: '',
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
    
    return (
        <form className="sign-up-form" name="sign-up-form" action="" method="post">
            <Header className="pageHeader" text="Регистрация" />
            <div className="sign-up-form__personal-data">
                <Header className="sectionHeader" text="Общая информация" style={{ marginBottom: "4px" }} />
                <FormInput
                    label={<Header className="formHeader" text="Имя"/>}
                    type="text"
                    placeholder="Иван"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    autocomplete="given-name"
                    requiered
                />
                <FormInput
                    label={<Header className="formHeader" text="Фамилия"/>}
                    type="text"
                    placeholder="Иванов"
                    name="surname"
                    value={formData.surname}
                    onChange={handleChange}
                    autocomplete="family-name"
                    requiered
                />
                <FormInput
                    label={<Header className="formHeader" text="Электронная почта"/>}
                    type="email"
                    placeholder="something@smth.com"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    autocomplete="email"
                    requiered
                />
                <FormInput
                    label={<Header className="formHeader" text="Телефон"/>}
                    type="tel"
                    placeholder="+7(XXX)XXX-XX-XX"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    autocomplete="tel"
                    requiered
                />
                <FormInput
                    label={<Header className="formHeader" text="Дата рождения"/>}
                    type="date"
                    placeholder="20.01.1995"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    autocomplete="off"
                    requiered
                />
            </div>
            <div className="sign-up-form__password">
                <Header className="sectionHeader" text="Создание пароля" style={{ marginBottom: "4px" }} />
                <FormInput
                    label={<Header className="formHeader" text="Введите пароль"/>}
                    type="password"
                    placeholder=""
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    autocomplete="off"
                    requiered
                />
                <FormInput
                    label={<Header className="formHeader" text="Повторите пароль"/>}
                    type="password"
                    placeholder=""
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    autocomplete="off"
                    requiered
                />
            </div>
            <div className="sign-up-form__buttons">
                <PrimaryButton
                    className="primaryButton"
                    text="Зарегистрироваться"
                    onClick={() => { console.log('primaryButton click') }}
                    type="submit"
                />
                <SecondaryButton
                    className="secondaryButton"
                    text="Отменить"
                    onClick={() => { console.log('secondaryButton click') }}
                    type="button"
                />
            </div>
        </form>
    );
};

export default SignUpForm;