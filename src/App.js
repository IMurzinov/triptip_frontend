import React from 'react';
import PrimaryButton from './components/Buttons/primary-button/PrimaryButton';
import SecondaryButton from './components/Buttons/secondary-button/SecondaryButton';
import DangerButton from './components/Buttons/danger-button/DangerButton';
import Header from './components/Texts/Headers/Header';
import FormInput from './components/Inputs/FormInput';
import SignUpForm from './components/Forms/sign-up/SignUpForm';
import AuthForm from './components/Forms/auth/AuthForm';

function App() {
  return (
    <div className='App'>
      <PrimaryButton className="primary-button" text="Зарегистрироваться" onClick={() => { console.log('primaryButton click') }} type="submit" />
      <SecondaryButton className="secondary-button" text="Добавить город" onClick={() => { console.log('secondaryButton click') }} type="button" />
      <DangerButton className="danger-button" text="Удалить аккаунт" onClick={() => { console.log('dangerButton click') }} type="button" />
      <Header className="page-header" text="Регистрация" />
      <Header className="section-header" text="Общая информация" />
      <Header className="form-header" text="Город" />
      <FormInput
        label={<Header className="form-header" text="Телефон"/>}
        type="tel"
        placeholder="+7(XXX)XXX-XX-XX"
        name="phone"
        value=""
        onChange={() => console.log("field's changed")}
        requiered
      />
      <SignUpForm />
    </div>
  );
}

export default App;
