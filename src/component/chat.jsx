import React from "react";
import "../App.css";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap-icons/font/bootstrap-icons.css';
const Chat = ({ moveTo }) =>{
  return (
    <div>
      <div className="mynav">
        <h2>Logo</h2>
        <div>
          <i onClick={ moveTo } className="bi bi-person-plus"></i>
          <i className="bi bi-gear"></i>
        </div>
      </div>
    </div>
  )
}

export default Chat;