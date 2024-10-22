import React, { createContext, useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import {isTokenExpired} from "./tokenExpire.jsx";
// Create an AuthContext
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authTokens, setAuthTokens] = useState(() => localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null);
    const [user, setUser] = useState(() => localStorage.getItem('authTokens') ? jwtDecode(localStorage.getItem('authTokens')) : null);
    const navigate = useNavigate();
    const [myprofile, setMyProfile] = useState({});

    // Login function to handle authentication
  const loginUser = async (username, password) => {
    try {
        const response = await axios.post('http://127.0.0.1:8000/login/', { username, password });
        if (response.status === 200) {
            const tokens = response.data;
            setAuthTokens(tokens);
            const decodedUser = jwtDecode(tokens.access); // Decode the access token
            setUser(decodedUser); // Set the user state to the decoded user
            localStorage.setItem('authTokens', JSON.stringify(tokens));
            navigate('/');
        } else {
            alert('Something went wrong!');
        }
    } catch {
        alert("Something went wrong");
        console.log("Server error: Unable to communicate with the server....");
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
    try {
        const response = await axios.post('http://127.0.0.1:8000/api/token/refresh/', { refresh: authTokens.refresh });
        if (response.status === 200) {
            setAuthTokens(response.data);
            setUser(jwtDecode(response.data.access));
            localStorage.setItem('authTokens', JSON.stringify(response.data));
        } else {
            alert("Failed to refresh token", response);
            logoutUser();
        }
    } catch (error) {
        alert("Error refreshing token:", error.response || error);
        logoutUser();
    }
}, [authTokens, logoutUser]);
    
    const getUserProfile = useCallback(async () => {
      // Get the access token from localStorage
      const accessToken = authTokens ? authTokens.access : null;

      if (accessToken) {
          try {
            // Make an authenticated GET request
            const response = await axios.get('http://127.0.0.1:8000/user/profile/', {
                headers: {
                    Authorization: `Bearer ${accessToken}`  // Add token to the Authorization header
                }
            });

            if (response.status === 200) {
                // Store the user's profile information in state
                setMyProfile(response.data);  // If response.data is an object, no need for [0]
            }
         } catch (error) {
            console.error('Error fetching user profile:', error);
         }
      } else {
          console.log("No token found. User is not authenticated.");
       }
    }, [authTokens, setMyProfile]);
    
    useEffect(() =>{
      if (authTokens) {
        if (isTokenExpired(authTokens.refresh) || isTokenExpired(authTokens)) updateToken();
      }
    }, [])
    
    useEffect(() =>{
      getUserProfile();
    }, [getUserProfile])
    
    
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
        logoutUser,
        myprofile
    };

    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;

