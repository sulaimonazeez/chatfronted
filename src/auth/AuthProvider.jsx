import React, { createContext, useState, useEffect, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { isTokenExpired } from "./tokenExpire.jsx"; // Utility to check token expiry

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authTokens, setAuthTokens] = useState(() =>
        localStorage.getItem("authTokens") ? JSON.parse(localStorage.getItem("authTokens")) : null
    );
    const [user, setUser] = useState(() =>
        localStorage.getItem("authTokens") ? jwtDecode(localStorage.getItem("authTokens")) : null
    );
    const [myprofile, setMyProfile] = useState({});
    const [myid, setId] = useState(null);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const location = useLocation();

    // Login function
    const loginUser = async (username, password) => {
        try {
            const response = await axios.post("https://chatits.pythonanywhere.com/login/", { username, password });
            if (response.status === 200) {
                const tokens = response.data;
                setAuthTokens(tokens);
                setUser(jwtDecode(tokens.access));
                localStorage.setItem("authTokens", JSON.stringify(tokens));
                navigate("/"); // Redirect to home page after successful login
            } else {
                setError("Username or Password is incorrect");
            }
        } catch (error) {
            console.error("Login error:", error);
            setError(error.response?.data?.error || error.message || "An error occurred. Check your internet connection.");
        }
    };

    // Logout function
    const logoutUser = useCallback(() => {
        setAuthTokens(null);
        setUser(null);
        localStorage.removeItem("authTokens");
        navigate("/login");
    }, [navigate]);

    // Refresh token function
    const updateToken = useCallback(async () => {
        if (!authTokens?.refresh) return; // Prevent execution if refresh token is missing

        try {
            const response = await axios.post("https://chatits.pythonanywhere.com/api/token/refresh/", {
                refresh: authTokens.refresh,
            });

            if (response.status === 200) {
                setAuthTokens(response.data);
                setUser(jwtDecode(response.data.access));
                localStorage.setItem("authTokens", JSON.stringify(response.data));
            } else {
                logoutUser();
            }
        } catch (error) {
            console.error("Error refreshing token:", error);
            logoutUser();
        }
    }, [authTokens?.refresh, logoutUser]);

    // Fetch user profile
    const getUserProfile = useCallback(async () => {
        if (!authTokens?.access) return;

        try {
            const response = await axios.get("https://chatits.pythonanywhere.com/user/profile/", {
                headers: { Authorization: `Bearer ${authTokens.access}` },
            });

            if (response.status === 200) {
                setMyProfile(response.data);
            }
        } catch (error) {
            console.error("Error fetching user profile:", error);
        }
    }, [authTokens?.access]);

    // Handle token expiration on page load
    useEffect(() => {
        if (!authTokens) {
            if (location.pathname !== "/create") logoutUser();
            return;
        }

        if (isTokenExpired(authTokens.refresh)) {
            logoutUser();
        } else if (isTokenExpired(authTokens.access)) {
            updateToken();
        }
    }, [authTokens, logoutUser, updateToken, location.pathname]);

    // Fetch user profile when authTokens change
    useEffect(() => {
        if (authTokens && !isTokenExpired(authTokens.access)) {
            getUserProfile();
        }
    }, [authTokens, getUserProfile]);

    // Refresh token periodically (every 4 minutes)
    useEffect(() => {
        if (authTokens) {
            const interval = setInterval(updateToken, 1000 * 60 * 4);
            return () => clearInterval(interval);
        }
    }, [authTokens, updateToken]);

    return (
        <AuthContext.Provider value={{ user, authTokens, loginUser, logoutUser, myprofile, myid, setId, error }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
