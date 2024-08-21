import { useSelector, useDispatch } from "react-redux";

import { logout } from '../../features/auth/authSlice';
import { Button } from '../../components';
import projectVLogo from '../../assets/ProjectV.svg';
import logo from '../../assets/logo.svg';

import './index.css';


const PageHeader = () => {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
    }


    return (
        <header className="header">
            <div>
                {/* "О Нас" + "Политика конфеденциальности" в зависимости от состояния isAuthenticated или isProfilePageOpened */}
            </div>
            <a href="///">
                <div className="header__logo-group">
                    <img className="projectV-logo" src={projectVLogo} alt='triptip logo'/>
                    <img className="logo" src={logo} alt='triptip logo'/>
                </div>
            </a>
            <div className="header__buttons">
                {isAuthenticated ? (
                    <div>
                        {/* Добавить отображение кнопок для состояний отличных от isAutenticated === false */}
                    </div>
                ) : (
                    <Button
                        btnType="secondary"
                        text="Войти"
                        type="button"
                    />
                    // Добавить ссылку на страницу AuthForm по нажатию кнопки
                )}
            </div>
        </header>
    );
};

export default PageHeader;