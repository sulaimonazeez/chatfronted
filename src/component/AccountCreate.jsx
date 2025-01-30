import React, { useState, useEffect } from "react";
import axios from "axios";
import "../login.css";
import { useNavigate } from "react-router-dom";

const AccountCreate = () => {
  const [username, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [error, createError] = useState('');
  const navigate = useNavigate();
  
  const [authTokens] = useState(() => localStorage.getItem("authTokens") ? JSON.parse(localStorage.getItem("authTokens")) : null );
  
  // Check if user is already authenticated
  const AccountSubmit = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/register/", { username, email, first_name, last_name, password });
      if (response.status === 200 || response.status === 201) {
        // Account created successfully, redirect to login page
        navigate('/login');
      } else {
        // Something went wrong, unable to create account
        createError("Unable to create account");
      }
    } catch (error) {
      createError(`Unable to create account: ${error}`);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    AccountSubmit();
  };

  useEffect(() => {
    if (authTokens) {
      navigate("/");
    }
  }, [authTokens, navigate]);

  return (
    <div className="full-bg">
      <div className="container-fluid">
        <h3>Sign Up</h3>
        <form onSubmit={handleSubmit} autoComplete="off">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input 
              type="text" 
              onChange={(e) => setUser(e.target.value)} 
              placeholder="Username" 
              id="username" 
              className="username" 
              name="username"
              autoComplete="off" 
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input 
              type="email" 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="Email" 
              id="email" 
              className="email" 
              name="email"
              autoComplete="off" 
            />
          </div>
          <div className="form-group">
            <label htmlFor="firstname">First Name</label>
            <input 
              type="text" 
              onChange={(e) => setFirstName(e.target.value)} 
              placeholder="First Name" 
              id="first_name" 
              className="first_name" 
              name="first_name"
              autoComplete="off" 
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastname">Last Name</label>
            <input 
              type="text" 
              onChange={(e) => setLastName(e.target.value)} 
              placeholder="Last Name" 
              id="last_name" 
              className="last_name" 
              name="last_name"
              autoComplete="off" 
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
              name="password"
              autoComplete="new-password" 
            />
          </div>
          <div className="form-group">
            <button type="submit" className="mybtn">Sign Up</button>
            <p className="option">Already have an account? <a href="/login">Login</a></p>
            <p style={{ color: "red"}}>{ error }</p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AccountCreate;
