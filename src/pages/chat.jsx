import React from "react";
import "./ExactUI.css"; // Ensure this is imported for custom glass styles

const Chat = ({ moveTo }) => {
  return (
    <div className="chat-nav-header d-flex justify-content-between align-items-center mb-4">
      {/* Stylized Logo/Name */}
      <div className="d-flex align-items-center">
        <div className="logo-icon me-2">CH</div>
        <h5 className="mb-0 text-white fw-bold d-none d-lg-block">Chatit</h5>
      </div>

      {/* Navigation Icons */}
      <div className="nav-action-icons d-flex gap-3">
        <button 
          onClick={moveTo} 
          className="btn-icon-glass" 
          title="Add Friend"
        >
          <i className="bi bi-person-plus"></i>
        </button>
        <button className="btn-icon-glass" title="Settings">
          <i className="bi bi-gear"></i>
        </button>
      </div>
    </div>
  );
};

export default Chat;
