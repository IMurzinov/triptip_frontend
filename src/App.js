import React from 'react';
import PrimaryButton from './components/Buttons/primary-button/PrimaryButton';
import SecondaryButton from './components/Buttons/secondary-button/SecondaryButton';

function App() {
  return (
    <div className='App'>
      <PrimaryButton className="primaryButton" text="Зарегистрироваться" onClick={() => { console.log('primaryButton click') }} />
      <SecondaryButton className="secondaryButton" text="Добавить город" onClick={() => {console.log("secondaryButton click")}} />
    </div>
  );
}

export default App;
