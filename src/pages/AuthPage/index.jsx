import { AuthForm } from "views";
import { PageHeader, Footer } from "components";

import "./index.css";

const AuthPage = () => {
    return <div className='auth-page__layout'>
        <PageHeader />
        <main>
            <AuthForm />
        </main>
        <Footer />
    </div>;
};

export default AuthPage;
