import React, { useContext, useState, useEffect} from "react";
import AuthProvider from "./AuthProvider.jsx";
import "../login.css";
import { useNavigate } from "react-router-dom";

const Login = () =>{
  const { loginUser } = useContext(AuthProvider);
  const [username, setUser] = useState('');
  const [password, setPassword] = useState('');
  const authTokens = useState(() => 
    localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null
)[0];

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
    <div className="full-bg">
    <div class="container-fluid">
    <h3>Login Form</h3>
    <form onSubmit={handleSubmit}>
        <div class="form-group">
            <label htmlFor="username">Username</label>
            <input type="text" onChange={(e)=>setUser(e.target.value)} placeholder="Username" id="username" className="username"/>
        </div>
        <div class="form-group">
            <label htmlFor="password">Password</label>
            <input placeholder="Password" onChange={(e)=>setPassword(e.target.value)} type="password" id="password" className="password" />
        </div>
        <div class="form-group">
            <button type="submit" className="mybtn">Login</button>
            <p class="option">Dont have an account? <a href="/create">SignUp</a></p>
        </div>

    </form>
</div>
</div>
  )
}

export default Login;