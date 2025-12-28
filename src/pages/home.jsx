import React, { useState, useEffect, useContext, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import AuthContext from ".././auth/AuthProvider.jsx";
import axios from "axios";
import Chat from "./chat.jsx";
import Search from "./search.jsx";
import Charts from "./charts.jsx";
import SignOut from ".././auth/signout.jsx";
import MessageIcon from ".././assets/message.svg";

// Import the specific CSS we created in the previous step
import "./ExactUI.css"; 

const Home = () => {
  const navigate = useNavigate();
  const { authTokens, logoutUser, myprofile } = useContext(AuthContext);
  const [friendsList, setFriendsList] = useState([]);
  const [selectedFriend, setSelectedFriend] = useState(null);
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
    <Container fluid className="vh-100 d-flex align-items-center justify-content-center bg-black-base p-0 bg-black m-0 w-100">
      <div className="main-wrapper rounded-5 overflow-hidden border-glass shadow-2xl">
        <Row className="g-0 h-100 w-100">
          
          <Col md={1} className="d-none d-lg-flex flex-column align-items-center py-3 bg-side-nav border-end-glass">
            <div className="logo mb-5 text-white fw-bold">CH</div>
            <div className="nav-items d-flex flex-column gap-4 text-secondary">
               <i className="bi bi-chat-fill text-white fs-5"></i>
               <i className="bi bi-folder2 fs-5"></i>
               <i className="bi bi-calendar3 fs-5"></i>
               <SignOut logout={logoutUser} user={myprofile} minimalist={true} />
            </div>
          </Col>
          <Col xs={12} md={4} lg={3} className={`${isMobile && selectedFriend ? 'd-none' : 'd-flex'} flex-column bg-panel border-end-glass`}>
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
          <Col 
            xs={12} md={8} lg={5} 
            className={`${isMobile && !selectedFriend ? 'd-none' : 'd-flex'} flex-column bg-chat-main`}
          >
            {selectedFriend ? (
              <>
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
                <div className="flex-grow-1 overflow-auto p-3">
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
          <Col lg={3} className="d-none d-xl-flex flex-column bg-panel border-start-glass p-4 text-white">
             <h6 className="fw-bold">Chat Details</h6>
          </Col>

        </Row>
      </div>
    </Container>
  );
};

export default Home;
