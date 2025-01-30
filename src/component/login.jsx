import React, { useContext, useState, useEffect } from "react";
import AuthProvider from "./AuthProvider.jsx";
import "../login.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { loginUser, error, authTokens } = useContext(AuthProvider);
  const [username, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading before login attempt

    try {
      await loginUser(username, password); // Wait for login attempt to complete
    } catch (err) {
      console.error("Login error:", err);
    } finally {
      setLoading(false); // Stop loading in all cases (success or failure)
    }
  };

  // Redirect when authentication tokens are available
  useEffect(() => {
    if (authTokens) {
      navigate("/");
    }
  }, [authTokens, navigate]);

  return (
    <div className="full-bg">
      <div className="container-fluid">
        <h3>Login Form</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input 
              type="text" 
              onChange={(e) => setUser(e.target.value)} 
              placeholder="Username" 
              id="username" 
              className="username"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input 
              placeholder="Password" 
              onChange={(e) => setPassword(e.target.value)} 
              type="password" 
              id="password" 
              className="password" 
              required
            />
          </div>
          <div className="form-group">
            <button type="submit" className="mybtn" disabled={loading}>
              {loading ? <span className="spinner"></span> : "Login"}
            </button>
            <p className="option">Don't have an account? <a href="/create">Sign Up</a></p>
            {error && <p style={{ color: "red" }}>{error}</p>}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
