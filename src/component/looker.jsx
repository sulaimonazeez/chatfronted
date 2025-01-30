import React, { useState } from "react";
import "../App.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Looker = () =>{
  const [query, setQuery] = useState("");
  const [result, setResult] = useState(false);
  const authTokens = useState(() => 
    localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null
)[0];

  const navigate = useNavigate();
  
  const handleSearch = async (q) =>{
    try {
      const accessToken = authTokens ? authTokens.access : null;
      let response = await axios.get('http://127.0.0.1:8000/search/', {
                  headers: {
                      Authorization: `Bearer ${accessToken}`  // Add token to the Authorization header
                  },
                  params: {
                    "query": q
                  }
              });
      
      if (response.status === 200) {
        //everything was good -- smile
        setResult(response.data);
        
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
  }
  const makeSearch = (e) =>{
    e.preventDefault();
    if (query) {
      handleSearch(query);
    }
  }
  
  const LetChat = async (id) =>{
    try {
      const accessToken = authTokens ? authTokens.access : null;
      let response = await axios.post('http://127.0.0.1:8000/friends/', {"id":id}, {
                  headers: {
                      Authorization: `Bearer ${accessToken}`  // Add token to the Authorization header
                  },
              });
      
      if (response.status === 200 || response.status === 201) {
        navigate(`/chat/${id}`);
      } else {
        navigate(`/chat/${id}`);
      }
    } catch (err) {
      //something terrible want wrong maybe it js internet connnect error let log it out
      console.log(err);
    }
  }
 return ( 
   <div className="container-fluid">
      <form onSubmit={makeSearch} className="text-center container-fluid">
         <input onChange={(e)=>setQuery(e.target.value)} type="search" placeholder="Paste or Enter Username or UserId" className="looking--user" />
      </form><br/><br/>
      {result && result.length > 0 ? result.map((data, indx) => {
          return (
            <div onClick={()=>LetChat(data.id)} key={indx} className="dp">
              <img src="https://avatar.iran.liara.run/public" className="img-profile" width="50" height="50" alt="profile-pic" />
              <div>
                <h6 style={{color:'lightgrey'}}>{data.username}</h6>
                <small className="text-secondary">Click here to start chat</small>
              </div>
            </div>
          );
        }) : <p className="text-center fw-bold">No results found</p>}
      <div className="text-center mt-5 container-fluid">
        <div className="container mt-5"><br />
         <p style={{backgroundColor: '#000020', color:'lightgrey'}} className="mt-5 p-3">Ask your friend to share their User ID.</p>
        </div>
      </div>
      <div className="container text-center mt-5"><br/><br/>
        <p className="text-center text-light">Share your UserId</p>
        <div className="d-flex justify-content-evenly text-light">
          <i className="bi bi-facebook"></i>
          <i className="bi bi-whatsapp"></i>
          <i className="bi bi-instagram"></i>
        </div>
        
      </div>
    </div>
  )
}

export default Looker;