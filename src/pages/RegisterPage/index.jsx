import { PageHeader } from 'components';
import { SignUpForm } from 'views';

import 'pages/RegisterPage/index.css';

const RegisterPage = () => {
 return <div className='register-page__layout'>
    <PageHeader />
    <SignUpForm />
 </div>
};

export default RegisterPage;