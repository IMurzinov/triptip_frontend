import { AuthForm } from 'views';
import { PageHeader } from 'components';

import './index.css';

const AuthPage = () => {
    return <div className='auth-page__layout'>
        <PageHeader />
        <AuthForm />
    </div>;
};

export default AuthPage;
