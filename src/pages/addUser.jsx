import React from "react";
import '../App.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Nav from ".././components/ui/nav.jsx";
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