import React, { useState, useEffect, useContext, useCallback } from "react";
import Picker from "emoji-picker-react";
import "../App.css"; // Custom CSS for styling
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import AuthProvider from "./AuthProvider.jsx";
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

const ChatInterface = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [recipientProfile, setRecipientProfile] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate(); // To handle navigation
  const [authTokens] = useState(() =>
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null
  );
  const { myprofile } = useContext(AuthProvider);

  // Fetch recipient profile details
  const fetchRecipientProfile = useCallback(async () => {
    try {
      const accessToken = authTokens ? authTokens.access : null;
      const response = await axios.get(`http://127.0.0.1:8000/users/${id}/`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (response.status === 200) {
        setRecipientProfile(response.data);
      } else {
        console.error("Failed to fetch user profile.");
      }
    } catch (err) {
      console.error("An error occurred while fetching the profile:", err);
    }
  },[authTokens, id,setRecipientProfile]);

  // Fetch profile on mount
  useEffect(() => {
    fetchRecipientProfile();
  }, [fetchRecipientProfile]);

  const sendMessage = () => {
    if (message.trim() !== "") {
      setMessage(""); // Clear the input field
      SendMessage(message);
    }
  };

  const onEmojiClick = (event, emojiObject) => {
    setMessage(message + emojiObject.emoji);
  };

  const SendMessage = async (msg) => {
    try {
      const accessToken = authTokens ? authTokens.access : null;
      const response = await axios.post(
        `http://127.0.0.1:8000/messages/${id}/`,
        { message: msg },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.status === 200) {
        console.log("Message sent...");
      } else {
        console.error("Failed to send message.");
      }
    } catch (err) {
      console.error("An error occurred while sending the message:", err);
    }
  };

  const updateMessage = useCallback(async () => {
    try {
      const accessToken = authTokens ? authTokens.access : null;
      const response = await axios.get(`http://127.0.0.1:8000/messages/${id}/`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (response.status === 200 || response.status === 201) {
        if (response.data !== messages) {
          setMessages(response.data);
        }
      } else {
        console.error("Failed to fetch messages.");
      }
    } catch (err) {
      console.error("Error fetching messages:", err);
    }
  },[authTokens, id, messages]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      updateMessage();
    }, 3000);

    return () => {
      clearInterval(intervalId);
    };
  }, [updateMessage]);

  return (
    <div className="chat-container">
      {/* Profile Header */}
      <div className="chat-header">
        <div className="profile-header">
          <button className="back-btn" onClick={() => navigate(-1)}>
            <i className="bi bi-chevron-left"></i>
          </button>
          {recipientProfile ? (
            <div className="profile-info" onClick={() => navigate(`/profile/${id}`)}>
              <img
                src={recipientProfile.profile_picture || "https://avatar.iran.liara.run/public"}
                alt="Profile"
                className="img-profile"
              />
              <div className="access-info">
                <h3 className="profile-name">{recipientProfile.username}</h3>
                <small className="profile-status">
                  {recipientProfile.status || "Online"}
                </small>
              </div>
            </div>
          ) : (
            <h3>Loading profile...</h3>
          )}
        </div>
      </div>

      {/* Chat Messages */}
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message ${
              msg.sender["username"] === myprofile["username"]
                ? "my-message"
                : "their-message"
            }`}
          >
            <span>{msg.message}</span>
          </div>
        ))}
      </div>

      {/* Chat Input Area */}
      <div className="chat-input-area">
        <button
          className="emoji-btn"
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
        >
          😀
        </button>

        {showEmojiPicker && (
          <div className="emoji-picker">
            <Picker onEmojiClick={onEmojiClick} />
          </div>
        )}

        <input
          type="text"
          className="message-input"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
        />

        <button className="send-btn" onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatInterface;
