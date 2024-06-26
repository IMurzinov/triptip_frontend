import React from 'react';
import PrimaryButton from './components/Buttons/primary-button/PrimaryButton';
import SecondaryButton from './components/Buttons/secondary-button/SecondaryButton';
import DangerButton from './components/Buttons/danger-button/DangerButton';
import Header from './components/Texts/Headers/Header';

function App() {
  return (
    <div className='App'>
      <PrimaryButton className="primaryButton" text="Зарегистрироваться" onClick={() => { console.log('primaryButton click') }} />
      <SecondaryButton className="secondaryButton" text="Добавить город" onClick={() => { console.log('secondaryButton click') }} />
      <DangerButton className="dangerButton" text="Удалить аккаунт" onClick={() => { console.log('dangerButton click') }} />
      <Header className="pageHeader" text="Регистрация" />
      <Header className="sectionHeader" text="Общая информация" />
      <Header className="formHeader" text="Город" />
    </div>
  );
}

export default App;
