import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const EntranceAuthCheck = ({ children }) => {
    const userId = useSelector((state) => state.auth.user?.id);
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated && userId) {
            navigate(`/profile/${userId}`, { replace: true });
        }
    }, [isAuthenticated, userId, navigate]);

    // Если пользователь не залогинен, рендерим переданные children
    return !isAuthenticated ? children : null;
};

export default EntranceAuthCheck;