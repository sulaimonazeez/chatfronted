import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import Chat from "./chat.jsx";


const Home = () =>{
  const navigate = useNavigate();
  const [authTokens, setAuthTokens] = useState(() => localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null);
  
  useEffect(() =>{
    if (authTokens === null || authTokens === "") {
      navigate("/login");
    }
  }, [authTokens, navigate])
  return (
    <div>
      <Chat />
    </div>
  );
}

export default Home;