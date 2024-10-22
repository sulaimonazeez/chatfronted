import React from "react";
import "../App.css";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useNavigate } from "react-router-dom";

const Charts = ({ username, id }) => {
  const navigate = useNavigate();
  
  const View = () =>{
    navigate(`/chat/${id}`);
  }
  return (
    <div className="dp" onClick={View}>
      <img src="https://avatar.iran.liara.run/public" className="img-profile" width="50" height="50"/>
      <div>
        <h6 style={{color:'lightgrey'}} className=''>{username}</h6>
        <small className="text-secondary">Click here to start chat</small>
      </div>
    </div>
  )
}

export default Charts