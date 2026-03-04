import { NavLink } from "react-router-dom";

import "./index.css";

const SidebarNavItem = ({ to, label, icon }) => {
    return (
        <NavLink
            to={to}
            end={to === "/"}
            className={({ isActive }) =>
                `sidebar-nav-item${isActive ? " sidebar-nav-item--active" : ""}`
            }
        >
            <img
                src={icon}
                alt={label}
                className="sidebar-nav-item__icon"
            />
            <span className="sidebar-nav-item__label">{label}</span>
        </NavLink>
    );
};

export default SidebarNavItem;
