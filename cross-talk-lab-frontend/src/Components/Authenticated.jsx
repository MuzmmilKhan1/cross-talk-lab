import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { backendRequest } from "../Helpers/backendRequest";

export function Authenticated({ children }) {
    const [isLoading, setIsLoading] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            window.isLoggedIn = (window.isLoggedIn) || (await backendRequest("GET", "/login-status")).isLoggedIn;
            setIsAuthenticated(window.isLoggedIn);
            setIsLoading(false);
            if (!window.isLoggedIn) navigate("/login");
        })();
    }, []);

    if (isLoading) return "Loading...";
    else if (isAuthenticated) return children;
}