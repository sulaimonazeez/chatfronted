import React, { useState, useEffect } from "react";
import axios from "axios";
import '../create.css';
import { useNavigate } from "react-router-dom";

const AccountCreate = () => {
  const [username, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  
  const [authTokens, setAuthTokens] = useState(() => localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null);
  
  //check if user is already authenticate
  
  const AccountSubmit = async () => {
   try {
     const response = await axios.post("http://127.0.0.1:8000/register/", {username, email, first_name, last_name, password});
     if (response.status === 200) {
      //account created successful reedirect to login page;
       navigate('/login')
     } else {
       //something went wrong unable to generate account
       alert("Something Went Wrong..... please check your input field and try again");
     }
   }catch (error) {
     alert(error);
   }
    
  }
  const handleSubmit = (e) =>{
    e.preventDefault();
    AccountSubmit();
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
            <h2> SIGN UP </h2>
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <input onChange={(e)=>setUser(e.target.value)} type="text" id="email" name="username" placeholder="Username" required />
                </div>
                <div className="input-group">
                    <input onChange={(e)=>setEmail(e.target.value)} type="email" id="email" name="email" placeholder="Email" required />
                </div>
                <div className="input-group">
                    <input onChange={(e)=>setFirstName(e.target.value)} type="text" id="email" name="first_name" placeholder="First Name" required />
                </div>
                <div className="input-group">
                    <input onChange={(e)=>setLastName(e.target.value)} type="text" id="email" name="last_name" placeholder="Last Name" required />
                </div>
                <div className="input-group">
                    <input onChange={(e)=>setPassword(e.target.value)} type="password" id="pass" name="password" placeholder="Password" className="rounded-pill" required />
                    <span id="toggler" className="toggle-password">👁️</span>
                </div>
                <button type="submit" className="btn btn-secondary rounded-pill"> SIGN UP </button>
            </form>
            <div className="footer">
                <a href="#" className="forgot-password">Forgot password?</a>
                <p>Already have account? <a href="/login" className="register">Login!</a></p>
            </div>
        </div>
    </div>
   </div>
    )
}

export default AccountCreate;