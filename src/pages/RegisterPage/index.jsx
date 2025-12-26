import { Footer } from "components";
import { SignUpForm } from "views";

import "./index.css";

const RegisterPage = () => {
 return <div className='register-page__layout'>
    <main>
      <SignUpForm />
    </main>
    <Footer />
 </div>
};

export default RegisterPage;