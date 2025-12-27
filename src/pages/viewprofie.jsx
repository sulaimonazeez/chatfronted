import React, { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../App.css"; // Add relevant styles here

const ViewProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState(null);
  const [authTokens] = useState(() =>
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null
  );

  const fetchUserDetails = useCallback(async () => {
    try {
      const accessToken = authTokens ? authTokens.access : null;
      const response = await axios.get(`https://chatits.pythonanywhere.com/users/${id}/`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (response.status === 200) {
        setUserDetails(response.data);
      } else {
        console.error("Failed to fetch user details.");
      }
    } catch (err) {
      console.error("Error fetching user details:", err);
    }
  }, [id, authTokens]);

  useEffect(() => {
    fetchUserDetails();
  }, [fetchUserDetails]);

  return (
    <div className="user-profile-container">
      <button className="back-btns" onClick={() => navigate(-1)}>
      <i className="bi bi-chevron-left"></i>
      </button>
      {userDetails ? (
        <div className="user-details">
          <img
            src={userDetails.profile_picture || "https://avatar.iran.liara.run/public" }
            alt="Profile"
            className="user-profile-picture"
          />
          <h2>{userDetails.firstname} {userDetails.lastname}</h2>
          <p><strong>Username:</strong> {userDetails.username}</p>
          <p><strong>Email:</strong> {userDetails.email}</p>
          <p><strong>Status:</strong> {userDetails.status || "Online"}</p>
        </div>
      ) : (
        <p>Loading user details...</p>
      )}
    </div>
  );
};

export default ViewProfile;
