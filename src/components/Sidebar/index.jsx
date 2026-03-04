import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { logout } from "features/auth/authSlice";
import { cleanUserTrips } from "features/userTrips/userTripsSlice";

import SidebarNavItem from "./NavItem";

import homeIcon from "assets/images/homeIcon.svg";
import profileIcon from "assets/images/profileIcon.svg";
import friendsIcon from "assets/images/friendsIcon.svg";
import activityIcon from "assets/images/activityIcon.svg";
import settingsIcon from "assets/images/settingsIcon.svg";
import logoutIcon from "assets/images/logoutIcon.svg";
import logoIcon from "assets/images/logo-v2.svg";

import "./index.css";

const Sidebar = () => {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const userId = useSelector((state) => state.auth.user?.id);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    if (!isAuthenticated) {
        return null;
    }

    const handleLogout = () => {
        dispatch(logout());
        dispatch(cleanUserTrips());
        navigate("/");
    };

    return (
        <aside className="sidebar">
            <div className="sidebar__logo-section">
                <Link to="/" className="sidebar__logo-link">
                    <div className="sidebar__logo-icon">
                        <img src={logoIcon} alt="TripTip logo" className="sidebar__logo-img" />
                    </div>
                    <span className="sidebar__logo-text">TripTip</span>
                </Link>
            </div>

            <nav className="sidebar__nav">
                <SidebarNavItem to="/" label="Главная" icon={homeIcon} />
                <SidebarNavItem to={`/profile/${userId}`} label="Профиль" icon={profileIcon} />
                <SidebarNavItem to="/friends" label="Друзья" icon={friendsIcon} />
                <SidebarNavItem to="/activity" label="Активность" icon={activityIcon} />
            </nav>

            <div className="sidebar__bottom">
                <hr className="sidebar__divider" />
                <SidebarNavItem to="/settings" label="Настройки" icon={settingsIcon} />
                <button className="sidebar__logout" onClick={handleLogout}>
                    <img src={logoutIcon} alt="logout" className="sidebar__logout-icon" />
                    <span>Выйти</span>
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
