import React, { createContext, useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { isTokenExpired } from "./tokenExpire.jsx"; // Utility to check token expiry
import { useLocation } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authTokens, setAuthTokens] = useState(() =>
        localStorage.getItem("authTokens") ? JSON.parse(localStorage.getItem("authTokens")) : null
    );
    const [user, setUser] = useState(() =>
        localStorage.getItem("authTokens") ? jwtDecode(localStorage.getItem("authTokens")) : null
    );
    const navigate = useNavigate();
    const [myprofile, setMyProfile] = useState({});
    const [myid, setId] = useState();
    const location = useLocation();

    // Login function
    const loginUser = async (username, password) => {
        try {
            const response = await axios.post("http://127.0.0.1:8000/login/", { username, password });
            if (response.status === 200) {
                const tokens = response.data;
                setAuthTokens(tokens);
                const decodedUser = jwtDecode(tokens.access);
                setUser(decodedUser);
                localStorage.setItem("authTokens", JSON.stringify(tokens));
                navigate("/"); // Redirect to home page after successful login
            } else {
                alert("Invalid credentials");
            }
        } catch (error) {
            console.error("Login error:", error);
            alert("Something went wrong. Please try again.");
        }
    };

    // Logout function
    const logoutUser = useCallback(() => {
        setAuthTokens(null);
        setUser(null);
        localStorage.removeItem("authTokens");
        navigate("/login"); // Redirect to login page after logout
    }, [navigate]);

    // Refresh tokens
    const updateToken = useCallback(async () => {
        if (!authTokens?.refresh) return; // Ensure refresh token is available

        try {
            const response = await axios.post("http://127.0.0.1:8000/api/token/refresh/", { refresh: authTokens.refresh });
            if (response.status === 200) {
                setAuthTokens(response.data);
                setUser(jwtDecode(response.data.access));
                localStorage.setItem("authTokens", JSON.stringify(response.data));
            } else {
                logoutUser(); // Logout if refresh token is not valid
            }
        } catch (error) {
            console.error("Error refreshing token:", error);
            logoutUser();
        }
    }, [authTokens, logoutUser]);

    // Fetch user profile
    const getUserProfile = useCallback(async () => {
        const accessToken = authTokens ? authTokens.access : null;

        if (accessToken) {
            try {
                const response = await axios.get("http://127.0.0.1:8000/user/profile/", {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                if (response.status === 200) {
                    setMyProfile(response.data);
                }
            } catch (error) {
                console.error("Error fetching user profile:", error);
            }
        }
    }, [authTokens]);

    // Check token validity on page load
    useEffect(() => {
        // Get the current pathname
        const currentPath = location.pathname;

        // Allow users to stay on the signup page
        if (!authTokens || isTokenExpired(authTokens.refresh)) {
            if (currentPath !== "/create") {
                logoutUser();
            }
        } else if (isTokenExpired(authTokens.access)) {
            updateToken();
        }
    }, [authTokens, updateToken, logoutUser, location]);
    // Fetch user profile when authTokens change
    useEffect(() => {
        if (authTokens) {
            getUserProfile();
        }
    }, [authTokens, getUserProfile]);

    // Refresh token periodically
    useEffect(() => {
        if (authTokens) {
            const interval = setInterval(() => {
                updateToken();
            }, 1000 * 60 * 4); // Refresh token every 4 minutes
            return () => clearInterval(interval);
        }
    }, [authTokens, updateToken]);

    const contextData = {
        user,
        authTokens,
        loginUser,
        logoutUser,
        myprofile,
        myid,
        setId,
    };

    return <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>;
};

export default AuthContext;
