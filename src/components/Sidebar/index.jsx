import { Link } from "react-router-dom";
import { AiOutlineHome, AiOutlineUser, AiOutlineTeam, AiOutlineThunderbolt, AiOutlineSetting, AiOutlineLogout, AiOutlineLeft } from "react-icons/ai";

import "./index.css";

const navItems = [
    { key: 'home', label: 'Главная', icon: AiOutlineHome, to: '/' },
    { key: 'profile', label: 'Профиль', icon: AiOutlineUser, to: '/profile' },
    { key: 'friends', label: 'Друзья', icon: AiOutlineTeam, to: '/friends' },
    { key: 'activity', label: 'Активность', icon: AiOutlineThunderbolt, to: '/activity' },
];

const Sidebar = ({ activeItem }) => {
    return (
        <aside className="sidebar">
            <div className="sidebar__top">
                <div className="sidebar__logo">
                    <div className="sidebar__logo-icon">T</div>
                    <span className="sidebar__logo-text">TripTip</span>
                </div>
                <button className="sidebar__collapse-btn" aria-label="Свернуть">
                    <AiOutlineLeft />
                </button>
                <nav className="sidebar__nav">
                    {navItems.map(({ key, label, icon: Icon, to }) => (
                        <Link
                            key={key}
                            to={to}
                            className={`sidebar__nav-item ${activeItem === key ? 'sidebar__nav-item--active' : ''}`}
                        >
                            <Icon className="sidebar__nav-icon" />
                            <span>{label}</span>
                        </Link>
                    ))}
                </nav>
            </div>
            <div className="sidebar__bottom">
                <div className="sidebar__divider" />
                <Link to="/settings" className="sidebar__nav-item">
                    <AiOutlineSetting className="sidebar__nav-icon" />
                    <span>Настройки</span>
                </Link>
                <button className="sidebar__nav-item sidebar__nav-item--logout">
                    <AiOutlineLogout className="sidebar__nav-icon" />
                    <span>Выйти</span>
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
