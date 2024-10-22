import React, { useState, useEffect } from "react";
import "../App.css";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useNavigate } from "react-router-dom";

const SignOut = ({ user, logout }) => {
  const navigate = useNavigate();
  const [authTokens, setAuthTokens] = useState(() => localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null);
  useEffect(() =>{
    if (!authTokens) {
      navigate("/login");
    }
  }, [authTokens, navigate])
  const { username } = user;
  return (
   <div className="container-fluid signout">
    <div className="container-fluid dps" style={{ backgroundColor: '#000030',}}>
      <img src="https://avatar.iran.liara.run/public/job/doctor/male" className="img-profile" width="50" height="50"/>
      <div>
        <h6 style={{color:'lightgrey'}} className=''>{ username }</h6>
        <small className="text-secondary">copyUserId</small>
      </div>
      <div onClick={ logout }>
        <i className="bi bi-box-arrow-right"></i>
      </div>
    </div>
   </div>
  )
}

export default SignOut;