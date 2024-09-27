import { AuthForm, SignUpForm, TripList } from 'views';
import { PageHeader, Userpic } from 'components';

function App() {
  return (
    <div className='App'>
      <Userpic user_id='1' size='small'/>
      <Userpic user_id='1' size='medium'/>
      <Userpic user_id='1' size='large'/>
    </div>
  );
}

export default App;
