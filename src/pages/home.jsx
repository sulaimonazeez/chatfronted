import React, { useState, useEffect, useContext, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import AuthContext from ".././auth/AuthProvider.jsx";
import axios from "axios";

// Your Components
import Chat from "./chat.jsx";
import Search from "./search.jsx";
import Charts from "./charts.jsx"; // Assuming this is the Sidebar Chat Item
import SignOut from ".././auth/signout.jsx";
import MessageIcon from ".././assets/message.svg";

// Import the specific CSS we created in the previous step
import "./ExactUI.css"; 

const Home = () => {
  const navigate = useNavigate();
  const { authTokens, logoutUser, myprofile } = useContext(AuthContext);
  const [friendsList, setFriendsList] = useState([]);
  const [selectedFriend, setSelectedFriend] = useState(null); // Track active chat
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const handleResize = () => setIsMobile(window.innerWidth <= 768);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const fetchFriends = useCallback(async () => {
    try {
      const accessToken = authTokens?.access;
      if (!accessToken) return;
      const response = await axios.get("https://chatits.pythonanywhere.com/friends/", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      if (response.status === 200) setFriendsList(response.data);
    } catch (err) {
      console.error("Error fetching friends:", err);
    }
  }, [authTokens]);

  useEffect(() => {
    if (authTokens) fetchFriends();
  }, [authTokens, fetchFriends]);

  return (
    <Container fluid className="vh-100 d-flex align-items-center justify-content-center bg-black-base p-0 p-md-4">
      <div className="main-wrapper rounded-5 overflow-hidden border-glass shadow-2xl">
        <Row className="g-0 h-100">
          
          {/* 1. MINI PERMANENT SIDEBAR (Icons Only) */}
          <Col md={1} className="d-none d-lg-flex flex-column align-items-center py-4 bg-side-nav border-end-glass">
            <div className="logo mb-5 text-white fw-bold">CH</div>
            <div className="nav-items d-flex flex-column gap-4 text-secondary">
               <i className="bi bi-chat-fill text-white fs-5"></i>
               <i className="bi bi-folder2 fs-5"></i>
               <i className="bi bi-calendar3 fs-5"></i>
               <SignOut logout={logoutUser} user={myprofile} minimalist={true} />
            </div>
          </Col>

          {/* 2. FRIENDS LIST (Hidden on mobile if a chat is selected) */}
          <Col 
            xs={12} md={4} lg={3} 
            className={`${isMobile && selectedFriend ? 'd-none' : 'd-flex'} flex-column bg-panel border-end-glass`}
          >
            <div className="p-3">
              <Chat moveTo={() => navigate("/add")} />
              <Search />
            </div>
            
            <div className="list-container flex-grow-1 overflow-auto px-2 custom-scrollbar">
              {friendsList.length > 0 ? (
                friendsList.map((friendData) => (
                  <div 
                    key={friendData.friend.id} 
                    onClick={() => setSelectedFriend(friendData.friend)}
                    className="cursor-pointer"
                  >
                    <Charts
                      username={friendData.friend.username}
                      id={friendData.friend.id}
                      active={selectedFriend?.id === friendData.friend.id}
                    />
                  </div>
                ))
              ) : (
                <p className="text-center text-secondary mt-4">No friends found.</p>
              )}
            </div>
          </Col>

          {/* 3. MAIN CHAT AREA (Hidden on mobile if no chat selected) */}
          <Col 
            xs={12} md={8} lg={5} 
            className={`${isMobile && !selectedFriend ? 'd-none' : 'd-flex'} flex-column bg-chat-main`}
          >
            {selectedFriend ? (
              <>
                {/* Header with Back Button for Mobile */}
                <header className="p-3 border-bottom-glass d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center">
                    {isMobile && (
                      <Button variant="link" className="text-white ps-0" onClick={() => setSelectedFriend(null)}>
                        <i className="bi bi-chevron-left"></i>
                      </Button>
                    )}
                    <div>
                      <h6 className="mb-0 text-white fw-bold">{selectedFriend.username}</h6>
                      <small className="text-success">online</small>
                    </div>
                  </div>
                </header>
                
                {/* Actual Chat Messages Component */}
                <div className="flex-grow-1 overflow-auto p-3">
                   {/* Pass selectedFriend.id to your actual message component */}
                   <p className="text-center text-muted">Conversation with {selectedFriend.username}</p>
                </div>
              </>
            ) : (
              <div className="h-100 d-flex flex-column align-items-center justify-content-center text-secondary">
                <img alt="Chat" src={MessageIcon} style={{ width: '80px', opacity: 0.2 }} />
                <p className="mt-3">Select a friend to start chatting</p>
              </div>
            )}
          </Col>

          {/* 4. DETAILS PANEL (Desktop Only) */}
          <Col lg={3} className="d-none d-xl-flex flex-column bg-panel border-start-glass p-4 text-white">
             <h6 className="fw-bold">Chat Details</h6>
             {/* Add content here matching your image */}
          </Col>

        </Row>
      </div>
    </Container>
  );
};

export default Home;
