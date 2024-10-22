import React, { useState, useEffect, useContext, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import Chat from "./chat.jsx";
import Search from "./search.jsx";
import Charts from "./charts.jsx";
import SignOut from "./signout.jsx";
import AuthProvider from "./AuthProvider.jsx";
import axios from "axios";

const Home = () =>{
  const navigate = useNavigate();
  const [authTokens, setAuthTokens] = useState(() => localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null);
  const { user, logoutUser, myprofile } = useContext(AuthProvider);
  const [result, setResult] = useState([] || false)
  const UserLogout = () =>{
    logoutUser();
  }
  const userAdd = () =>{
    navigate("/add");
  }
  
  const Friends = useCallback(async () => {
    try {
      const accessToken = authTokens ? authTokens.access : null;
      const response = await axios.get('http://127.0.0.1:8000/friends/', {
                  headers: {
                      Authorization: `Bearer ${accessToken}`  // Add token to the Authorization header
                  }
              });
      
      if (response.status === 200) {
        //everything was good -- smile
        if (response.data !== result) {
          setResult(response.data);
        }
        
      } else {
        //something went wrong maybe not found any profile or user did not enter a valid data -- let log it out
        console.log("Something went wrong");
        alert("error kccure");
      }
    } catch (err) {
      //something terrible want wrong maybe it js internet connnect error let log it out
      console.log(err);
      alert("Bad Error unable to make a connection.....");
    }
  }, [authTokens, setResult])
  useEffect(() =>{
    if (!authTokens) {
      navigate("/login");
    }
    Friends();
  }, [authTokens, navigate, Friends])
  if (authTokens) {
   return (
    <div className="chat-group">
      <Chat moveTo={ userAdd } />
      <Search />
      {result ? result.map((data, indx) =>{
        return <Charts username={data.friend["username"]} id={data.friend["id"]} />
      }): <p>No Friend</p>}
      <SignOut logout={ UserLogout } user={myprofile}/>
    </div>
   );
  } else {
    navigate("/login")
  }
}

export default Home;