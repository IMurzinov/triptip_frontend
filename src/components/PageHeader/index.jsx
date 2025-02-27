import { useSelector, useDispatch } from "react-redux";
import { Link, Navigate } from "react-router-dom";

import { logout } from "features/auth/authSlice";
import { Button } from "components";
import plus from "assets/images/plus.svg";
import logo from "assets/images/logo-v2.svg";
import friendPlugOne from "assets/images/friendPlugOne.svg";
import friendPlugTwo from "assets/images/friendPlugTwo.svg";
import friendPlugThree from "assets/images/friendPlugThree.svg";

import "./index.css";


const PageHeader = () => {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
        return <Navigate to="/" replace />
    }

    const authenticatedHeaderRender = () => {
        return (
            <div className="page-header__container">
                <nav className="page-header__friends-group">
                    <div className="friends-avatar">
                        <img className="friend one" src={friendPlugOne} alt='friend avatar'/>
                        <img className="friend two" src={friendPlugTwo} alt='friend avatar'/>
                        <img className="friend three" src={friendPlugThree} alt='friend avatar'/>
                    </div>
                    <Link className="link" to="">
                        <Button
                            btnType="plain"
                            text="Друзья"
                            type="button"
                        />
                    </Link>
                </nav>
                <Link to="/">
                    <div className="page-header__logo-group">
                        <img className="logo" src={logo} alt='triptip logo'/>
                    </div>
                </Link>
                <nav className="page-header__buttons">
                    <Link className="link" to="/">
                        <Button
                            onClick={handleLogout}
                            btnType="secondary"
                            text="Выйти"
                            type="button"
                        />
                    </Link>
                    <Link className="link" to="/createyourtrip">
                        <Button
                            btnType="primary"
                            icon={plus}
                            text="Создать поездку"
                            type="button"
                        />
                    </Link>
                </nav>
            </div>
        );
    };

    const notAuthenticatedHeaderRender = () => {
        return (
            <div className="page-header__container">
                <Link to="/">
                    <div className="page-header__logo-group">
                        <img className="logo" src={logo} alt='triptip logo'/>
                    </div>
                </Link>
                <nav className="page-header__buttons">
                    <Link className="link" to="/register">
                        <Button
                            btnType="secondary"
                            text="Зарегистрироваться"
                            type="button"
                        />
                    </Link>
                    <Link className="link" to="/auth">
                        <Button
                            btnType="primary"
                            text="Войти"
                            type="button"
                        />
                    </Link>
                </nav>
            </div>
        );
    };


    return (
        <header className="page-header">
            {isAuthenticated ? ( authenticatedHeaderRender() ) : ( notAuthenticatedHeaderRender() )}
        </header>
    );
};

export default PageHeader;