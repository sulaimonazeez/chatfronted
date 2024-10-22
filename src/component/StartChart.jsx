import React, { useState, useEffect, useContext } from 'react';
import Picker from 'emoji-picker-react';
import '../App.css'; // Custom CSS for styling
import { useParams } from "react-router-dom";
import axios from "axios";
import AuthProvider from "./AuthProvider.jsx";

const ChatInterface = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const { id } = useParams();
  const [authTokens, setAuthTokens] = useState(() => localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null);
  const { myprofile } = useContext(AuthProvider);
  // Handle sending messages
  const sendMessage = () => {
    if (message.trim() !== "") {
      setMessage(""); // Clear the input field
      SendMessage(message);
    }
  };

  // Handle emoji click
  const onEmojiClick = (event, emojiObject) => {
    setMessage(message + emojiObject.emoji);
  };
  
  const SendMessage = async (msg)=> {
    try {
      const accessToken = authTokens ? authTokens.access : null;
      const response = await axios.post(`http://127.0.0.1:8000/messages/${id}/`, {"message":msg}, {
                  headers: {
                      Authorization: `Bearer ${accessToken}`  // Add token to the Authorization header
                  }
      });
      
      if (response.status === 200){
        //everything good smile
        console.log("message sent...");
      }else {
        console.log("Something went wrong.....");
        alert("Something went wrong");
      }
    }catch (err) {
      console.log("something went wrong", err);
      alert("Something went wrong", err);
    }
  }
  
  const updateMessage = async () =>{
      try{
        const accessToken = authTokens ? authTokens.access : null;
        const response = await axios.get(`http://127.0.0.1:8000/messages/${id}/`, {
                      headers: {
                          Authorization: `Bearer ${accessToken}`  // Add token to the Authorization header
                      },
          });
      if (response.status === 200 ||  response.status === 201) {
        //everything is good
        if (response.data !== messages) {
          setMessages(response.data)
        }
      } else {
        alert('something... went wrong');
      }
      } catch (err) {
        alert(err.response || err.message);
      }
  }
  
  useEffect(() => {
  const intervalId = setInterval(() => {
    updateMessage();
  }, 5000);
  
  // Cleanup function to clear interval
  return () => {
    clearInterval(intervalId);
  };
}, [updateMessage]);
  return (
    <div className="chat-container">
      {/* Chat Header */}
      <div className="chat-header">
        <h3>Start Texting.....</h3>
      </div>

      {/* Chat Messages */}
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender["username"] === myprofile["username"] ? 'my-message' : 'their-message'}`}>
            <span>{msg.message}</span>
          </div>
        ))}
      </div>

      {/* Chat Input Area */}
      <div className="chat-input-area">
        <button className="emoji-btn" onClick={() => setShowEmojiPicker(!showEmojiPicker)}>😀</button>
        
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

        <button className="send-btn" onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatInterface;