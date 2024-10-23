import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { logout } from 'features/auth/authSlice';
import { Button } from 'components';
import projectVLogo from 'assets/images/ProjectV.svg';
import logo from 'assets/images/logo.svg';

import 'components/PageHeader/index.css';


const PageHeader = () => {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
    }


    return (
        <header className="page-header">
            <div>
                {/* TODO: "О Нас" + "Политика конфеденциальности" в зависимости от состояния isAuthenticated или isProfilePageOpened */}
            </div>
            <Link to="/">
                <div className="page-header__logo-group">
                    <img className="projectV-logo" src={projectVLogo} alt='triptip logo'/>
                    <img className="logo" src={logo} alt='triptip logo'/>
                </div>
            </Link>
            <div className="page-header__buttons">
                {isAuthenticated ? (
                    <div>
                        {/* TODO: Добавить отображение кнопок для состояний отличных от isAutenticated === false */}
                    </div>
                ) : (
                    <Link className="link" to="/auth">
                        <Button
                            btnType="secondary"
                            text="Войти"
                            type="button"
                        />
                    </Link>
                )}
            </div>
        </header>
    );
};

export default PageHeader;