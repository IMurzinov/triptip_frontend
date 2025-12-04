import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const RouteStatusCheck = ({ children }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const [isChecking, setIsChecking] = useState(true);
    const [canRender, setCanRender] = useState(false);

    useEffect(() => {
        const checkRouteStatus = async () => {
            // Skip checking for error pages to avoid infinite loops
            if (location.pathname === "/404" || location.pathname === "/502") {
                setCanRender(true);
                setIsChecking(false);
                return;
            }

            setIsChecking(true);
            setCanRender(false);

            try {
                const response = await fetch(location.pathname, {
                    method: "HEAD",
                    credentials: "include",
                });

                if (response.status === 404) {
                    navigate("/404", { replace: true });
                    return;
                }

                if (response.status === 502) {
                    navigate("/502", { replace: true });
                    return;
                }

                setCanRender(true);
            } catch (error) {
                // Network errors or other fetch failures - allow navigation
                setCanRender(true);
            } finally {
                setIsChecking(false);
            }
        };

        checkRouteStatus();
    }, [location.pathname, navigate]);

    if (isChecking) {
        return null;
    }

    return canRender ? children : null;
};

export default RouteStatusCheck;
