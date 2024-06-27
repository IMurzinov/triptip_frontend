import React from 'react';
import PrimaryButton from './components/Buttons/primary-button/PrimaryButton';
import SecondaryButton from './components/Buttons/secondary-button/SecondaryButton';
import DangerButton from './components/Buttons/danger-button/DangerButton';
import Header from './components/Texts/Headers/Header';
import FormInput from './components/Inputs/FormInput';

function App() {
  return (
    <div className='App'>
      <PrimaryButton className="primaryButton" text="Зарегистрироваться" onClick={() => { console.log('primaryButton click') }} type="submit" />
      <SecondaryButton className="secondaryButton" text="Добавить город" onClick={() => { console.log('secondaryButton click') }} type="button" />
      <DangerButton className="dangerButton" text="Удалить аккаунт" onClick={() => { console.log('dangerButton click') }} type="button" />
      <Header className="pageHeader" text="Регистрация" />
      <Header className="sectionHeader" text="Общая информация" />
      <Header className="formHeader" text="Город" />
      <FormInput
        label={<Header className="formHeader" text="Телефон"/>}
        type="tel"
        placeholder="+7(XXX)XXX-XX-XX"
        name="phone"
        value=""
        onChange={() => console.log("field's changed")}
        requiered
      />
    </div>
  );
}

export default App;
