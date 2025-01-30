import React, { useState, useEffect } from "react";
import "../App.css";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useNavigate } from "react-router-dom";

const SignOut = ({ user, logout }) => {
  const navigate = useNavigate();
  const [authTokens, setAuthTokens] = useState(() => localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null);

  useEffect(() => {
    if (!authTokens) {
      setAuthTokens("");
      navigate("/login");

    }
  }, [authTokens, navigate]);

  const { username } = user;

  return (
    <div className="signout-container">
      <div className="signout-box">
        <img
          src="https://avatar.iran.liara.run/public/job/doctor/male"
          className="signout-avatar"
          alt="profile"
        />
        <div className="signout-info">
          <h6>{username}</h6>
          <small className="text-muted">User ID: {user.id}</small>
        </div>
        <div onClick={logout} className="signout-button">
          <i className="bi bi-box-arrow-right"></i>
        </div>
      </div>
    </div>
  );
};

export default SignOut;
