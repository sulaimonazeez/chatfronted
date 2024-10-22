import React from "react";
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { useNavigate } from "react-router-dom";
const Nav = () =>{
  const navigate = useNavigate();
  const Back = () =>{
    navigate("/");
  }
  return (
    <div className="move--to d-flex container-fluid">
      <i className="bi bi-chevron-left" onClick={Back}></i>
      <p>Add New Contact</p>
    </div>
  );
}

export default Nav;