import { createContext, useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

// Create an AuthContext
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authTokens, setAuthTokens] = useState(() => localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null);
    const [user, setUser] = useState(() => localStorage.getItem('authTokens') ? jwtDecode(localStorage.getItem('authTokens')) : null);
    const navigate = useNavigate();

    // Login function to handle authentication
    const loginUser = async (username, password) => {
      try {
        const response = await axios.post('http://127.0.0.1:8000/login/', { username, password });
        if (response.status === 200) {
            setAuthTokens(response.data);
            setUser(jwtDecode(response.data.access));
            localStorage.setItem('authTokens', JSON.stringify(response.data));
            navigate('/');
        } else {
            alert('Something went wrong!');
        }
      } catch {
        alert("Something Went wrong");
        console.log("Server error: Unabel to communicate with the server....");
      }
    };

    // Logout function
    const logoutUser = useCallback(() => {
        setAuthTokens(null);
        setUser(null);
        localStorage.removeItem('authTokens');
        navigate('/login');
    }, [navigate]);

    // Automatically refresh tokens when they expire
    const updateToken = useCallback(async () => {
        const response = await axios.post('http://127.0.0.1:8000/api/token/refresh/', { refresh: authTokens.refresh });
        if (response.status === 200) {
            setAuthTokens(response.data);
            setUser(jwtDecode(response.data.access));
            localStorage.setItem('authTokens', JSON.stringify(response.data));
        } else {
            logoutUser();
        }
    }, [authTokens, logoutUser]);

    // Refresh the token every 4 minutes
    useEffect(() => {
        if (authTokens) {
            const interval = setInterval(() => {
                updateToken();
            }, 1000 * 60 * 4);
            return () => clearInterval(interval);
        }
    }, [authTokens, updateToken]);

    const contextData = {
        user,
        authTokens,
        loginUser,
        logoutUser
    };

    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;

