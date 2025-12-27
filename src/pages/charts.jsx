import React from "react";
import "./ExactUI.css";
import { useNavigate } from "react-router-dom";

const Charts = ({ username, id, isMobile, onSelect, active }) => {
  
  const navigate = useNavigate();
  //const {myid, setId} = useContext(AuthContext);
  const handleClick = () => {
    if (isMobile) {
      navigate(`/chat/${id}`); // Redirect to chat page on mobile
    } else {
      // On desktop, just render the chat interface inline (this is handled in Home component)
      navigate(`/chat/${id}`); 

    }
  };


  return (
    <div 
      className={`chat-card p-3 rounded-4 mb-2 d-flex align-items-center cursor-pointer ${active ? 'active' : ''}`} 
      onClick={handleClick}
    >
      {/* 3D-Style Avatar Container */}
      <div className="avatar-container me-3 position-relative">
        <img
          src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`}
          className="friend-avatar-img rounded-3"
          alt="profile"
          style={{ width: '45px', height: '45px', backgroundColor: '#e9ecef' }}
        />
        {/* Online Status Dot */}
        <span className="position-absolute bottom-0 end-0 p-1 bg-success border border-2 border-dark rounded-circle"></span>
      </div>

      <div className="friend-info flex-grow-1 overflow-hidden">
        <div className="d-flex justify-content-between align-items-center">
          <h6 className="mb-0 text-white small fw-bold text-truncate">{username}</h6>
          <span className="x-small text-secondary">12:45</span>
        </div>
        <div className="d-flex justify-content-between align-items-center">
          <p className="mb-0 x-small text-secondary text-truncate">Click to start chatting...</p>
          {/* Unread Badge Example */}
          <span className="badge rounded-pill bg-primary-custom x-small">2</span>
        </div>
      </div>
    </div>
  );
};

export default Charts;
