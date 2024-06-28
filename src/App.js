import React from 'react';
import SignUpForm from './components/Forms/sign-up/SignUpForm';
import AuthForm from './components/Forms/auth/AuthForm';

function App() {
  return (
    <div className='App'>
      <AuthForm />
      <SignUpForm />
    </div>
  );
}

export default App;
