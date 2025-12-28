import React, { useState, useEffect, useContext, useCallback, useRef } from "react";
import Picker from "emoji-picker-react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import AuthProvider from "../auth/AuthProvider";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./ChatUniverse.css";

const ChatInterface = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const chatEndRef = useRef(null);

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [recipientProfile, setRecipientProfile] = useState(null);

  const [authTokens] = useState(() =>
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null
  );

  const { myprofile } = useContext(AuthProvider);

  const fetchRecipientProfile = useCallback(async () => {
    try {
      const res = await axios.get(
        `https://chatits.pythonanywhere.com/users/${id}/`,
        {
          headers: { Authorization: `Bearer ${authTokens?.access}` },
        }
      );
      setRecipientProfile(res.data);
    } catch (err) {
      console.error(err);
    }
  }, [id, authTokens]);

  const fetchMessages = useCallback(async () => {
    try {
      const res = await axios.get(
        `https://chatits.pythonanywhere.com/messages/${id}/`,
        {
          headers: { Authorization: `Bearer ${authTokens?.access}` },
        }
      );
      setMessages(res.data);
    } catch (err) {
      console.error(err);
    }
  }, [id, authTokens]);
  const sendMessage = async () => {
    if (!message.trim()) return;

    try {
      await axios.post(
        `https://chatits.pythonanywhere.com/messages/${id}/`,
        { message },
        {
          headers: { Authorization: `Bearer ${authTokens?.access}` },
        }
      );
      setMessage("");
      fetchMessages();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchRecipientProfile();
    fetchMessages();
    const interval = setInterval(fetchMessages, 3000);
    return () => clearInterval(interval);
  }, [fetchRecipientProfile, fetchMessages]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const onEmojiClick = (emoji) => {
    setMessage((prev) => prev + emoji.emoji);
  };

  return (
    <div className="chat-universe">

      {/* HEADER */}
      <header className="chat-header-glow">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <i className="bi bi-chevron-left"></i>
        </button>

        {recipientProfile && (
          <div className="profile-info" onClick={() => navigate(`/profile/${id}`)}>
            <img
              src={recipientProfile.profile_picture || "https://avatar.iran.liara.run/public"}
              alt="profile"
            />
            <div>
              <h6>{recipientProfile.username}</h6>
              <small className="online-dot">Online</small>
            </div>
          </div>
        )}
      </header>

      <main className="chat-body-glass">
        {messages.map((msg, index) => {
          const mine = msg.sender.username === myprofile.username;
          return (
            <div key={index} className={`bubble ${mine ? "mine" : "theirs"}`}>
              {msg.message}
            </div>
          );
        })}
        <div ref={chatEndRef} />
      </main>

      <footer className="chat-input-glow">
        <button onClick={() => setShowEmojiPicker(!showEmojiPicker)}>😀</button>

        <input
          placeholder="Type something cosmic..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />

        <button className="send-btn" onClick={sendMessage}>
          <i className="bi bi-send-fill"></i>
        </button>

        {showEmojiPicker && (
          <div className="emoji-box">
            <Picker theme="dark" onEmojiClick={onEmojiClick} />
          </div>
        )}
      </footer>
    </div>
  );
};

export default ChatInterface;