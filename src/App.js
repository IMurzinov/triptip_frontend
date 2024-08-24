import { AuthForm, SignUpForm, TripList } from 'views';
import { PageHeader } from 'components';

function App() {
  return (
    <div className='App'>
      <PageHeader />
      <TripList />
      <AuthForm />
      <SignUpForm />
    </div>
  );
}

export default App;
