import React from "react";
import "../App.css";
import { useNavigate } from "react-router-dom";


const Charts = ({ username, id, isMobile }) => {
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
    <div className="friend-item" onClick={handleClick}>
      <img
        src="https://avatar.iran.liara.run/public"
        className="friend-avatar"
        alt="profile"
      />
      <div className="friend-info">
        <h6>{username}</h6>
        <small className="text-muted">Click to start chat</small>
      </div>
    </div>
  );
};

export default Charts;
