import React, { useState, useEffect } from "react";
import axios from "axios";
import '../App.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { useNavigate } from "react-router-dom";
import Nav from "./nav.jsx";
import Looker from './looker.jsx';
const AddUsers = () => {
  return (
   <div className="add-user">
     <Nav />
     <Looker />
   </div>
  )
}

export default AddUsers;