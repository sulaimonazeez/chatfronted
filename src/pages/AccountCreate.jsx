import React, { useState, useEffect } from "react";
import axios from "axios";
import ".././static/signup.css";
import { useNavigate, Link } from "react-router-dom";

const AccountCreate = () => {
  const [username, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [error, createError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const [authTokens] = useState(() =>
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null
  );

  const AccountSubmit = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        "https://chatits.pythonanywhere.com/register/",
        {
          username,
          email,
          first_name,
          last_name,
          password,
        }
      );

      if (response.status === 200 || response.status === 201) {
        navigate("/login");
      } else {
        createError("Unable to create account");
      }
    } catch (error) {
      createError(
        `Unable to create account: ${
          error.response?.data?.detail || error.message
        }`
      );
    }
    setLoading(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!loading) AccountSubmit();
  };

  useEffect(() => {
    if (authTokens) navigate("/");
  }, [authTokens, navigate]);

  return (
    <div className="signup-wrapper">
      <div className="glow-bg"></div>
      <div className="signup-card">
        <h2 className="signup-title">Create Account</h2>

        <form onSubmit={handleSubmit} autoComplete="off">
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
            <label>Email</label>
            <input
              value={email}
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
              required
            />
          </div>

          <div className="input-group">
            <label>First Name</label>
            <input
              value={first_name}
              type="text"
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Enter first name"
              required
            />
          </div>

          <div className="input-group">
            <label>Last Name</label>
            <input
              value={last_name}
              type="text"
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Enter last name"
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

          <button className="signup-btn" type="submit" disabled={loading}>
            {loading ? <span className="loader"></span> : "Sign Up"}
          </button>

          <Link
  to="/login"
  className="login-link block text-center mt-4 text-orange-500 font-medium hover:text-orange-400 hover:underline transition duration-300 no-underline"
>
  Already have an account? Login
</Link>

          {error && <p className="error-text">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default AccountCreate;