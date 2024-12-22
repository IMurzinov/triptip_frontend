import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const EntranceAuthCheck = ({ children }) => {
    const username = useSelector((state) => state.auth.user?.username);
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated && username) {
            navigate(`/profile/${username}`, { replace: true });
        }
    }, [isAuthenticated, username, navigate]);

    // Если пользователь не залогинен, рендерим переданные children
    return !isAuthenticated ? children : null;
};

export default EntranceAuthCheck;