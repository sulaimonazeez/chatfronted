import React, { useContext, useState, useEffect } from "react";
import AuthProvider from ".././auth/AuthProvider.jsx";
import ".././static/login.css";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const { loginUser, error, authTokens } = useContext(AuthProvider);
  const [username, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await loginUser(username, password);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (authTokens) navigate("/");
  }, [authTokens, navigate]);

  return (
    <div className="login-wrapper">
      <div className="glow-bg"></div>
      <div className="login-card">
        <h2 className="login-title">Welcome Back</h2>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Username</label>
            <input
              value={username}
              type="text"
              onChange={(e) => setUser(e.target.value)}
              placeholder="Enter username"
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              value={password}
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
            />
          </div>

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? <span className="loader"></span> : "Login"}
          </button>

          <p className="signup-link">
            Don't have an account? <Link to="/create">Sign Up</Link>
          </p>

          {error && <p className="error-text">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default Login;