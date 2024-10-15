import React, { useContext, useState, useEffect} from "react";
import AuthProvider from "./AuthProvider.jsx";
import "../login.css";
import { useNavigate } from "react-router-dom";

const Login = () =>{
  const { loginUser } = useContext(AuthProvider);
  const [username, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [authTokens, setAuthTokens] = useState(() => localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null);
  const navigate = useNavigate();
  
  //handle submtion
  const handleSubmit = (e) =>{
    e.preventDefault();
    loginUser(username, password);
  }
  useEffect(() =>{
    if (authTokens) {
      navigate("/");
    }
  }, [authTokens, navigate]);
  
  
  return (
   <div className="parent-form">
    <div className="containers">
        <div className="login-box">
            <h2> Login </h2>
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <input onChange={(e)=>setUser(e.target.value)} type="text" id="email" name="username" placeholder="Username" required />
                </div>
                <div className="input-group">
                    <input onChange={(e)=>setPassword(e.target.value)} type="password" id="pass" name="password" placeholder="Password" className="rounded-pill" required />
                    <span id="toggler" className="toggle-password">👁️</span>
                </div>
                <button type="submit" className="btn btn-secondary"> LOGIN </button>
            </form>
            <div className="footer">
                <a href="#" className="forgot-password">Forgot password?</a>
                <p>Don't have an account? <a href="/accounts/create" className="register">Register!</a></p>
            </div>
        </div>
    </div>
   </div>
  )
}

export default Login;