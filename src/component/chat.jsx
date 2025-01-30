import React from "react";
import "../App.css";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap-icons/font/bootstrap-icons.css';

const Chat = ({ moveTo }) => {
  return (
    <div className="mynav rounded">
      <h2 className="app-name">Chatit</h2>
      <div className="nav-icons">
        <i onClick={moveTo} className="bi bi-person-plus"></i>
        <i className="bi bi-gear"></i>
      </div>
    </div>
  );
};

export default Chat;
