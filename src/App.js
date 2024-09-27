import { AuthForm, SignUpForm, TripList } from 'views';
import { PageHeader, Userpic } from 'components';
import { StartingPage } from 'pages';

import 'assets/fonts/fonts.css';

function App() {
  return (
    <div className='App'>
      <Userpic user_id='1' size='small'/>
      <Userpic user_id='1' size='medium'/>
      <Userpic user_id='1' size='large'/>
      <StartingPage />
    </div>
  );
}

export default App;
