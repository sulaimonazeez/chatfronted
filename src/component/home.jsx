import React, { useState, useEffect, useContext, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import Chat from "./chat.jsx";
import Search from "./search.jsx";
import Charts from "./charts.jsx";
import SignOut from "./signout.jsx";
import AuthContext from "./AuthProvider.jsx";
import axios from "axios";
//import Picker from "emoji-picker-react";
import MessageIcon from "../message.svg";

const Home = () => {
  const navigate = useNavigate();
  const { authTokens, logoutUser, myprofile } = useContext(AuthContext);
  const [friendsList, setFriendsList] = useState([]);
  const [isMobile, setIsMobile] = useState();

  // Logout handler
  const handleLogout = () => {
    logoutUser();
  };

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768); // Set 768px as the breakpoint
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Fetch friends from the API
  const fetchFriends = useCallback(async () => {
    try {
      const accessToken = authTokens ? authTokens.access : null;
      if (!accessToken) {
        console.log("No access token found.");
        return;
      }

      const response = await axios.get("http://127.0.0.1:8000/friends/", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.status === 200) {
        setFriendsList(response.data);
      } else {
        console.error("Failed to fetch friends:", response.statusText);
      }
    } catch (err) {
      console.error("Error fetching friends:", err);
    }
  }, [authTokens]);

  // Fetch recipient profile details
  

  
  
  useEffect(() => {
    if (authTokens) {
      fetchFriends();
    }
  }, [authTokens, fetchFriends]);

  

  return (
    <div className="home-container">
      {/* Sidebar */}
      <div className="sidebar">
        <Chat moveTo={() => navigate("/add")} />
        <Search />
        <div className="friends-list">
          {friendsList.length > 0 ? (
            friendsList.map((friendData) => (
              <Charts
                key={friendData.friend.id}
                username={friendData.friend.username}
                id={friendData.friend.id}
                isMobile={isMobile}
              />
            ))
          ) : (
            <p className="no-friends-message">No friends found.</p>
          )}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="chat-container chatting">
            <div className="chat-messages">
              <div className="starting">
              <img alt="Chat" src={ MessageIcon } />
              <p>Start Chatting</p>
              </div>
             </div>
        <SignOut logout={handleLogout} user={myprofile} />
      </div>
    </div>
  );
};

export default Home;
