import React, { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./profiles.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const ViewProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  const authTokens = localStorage.getItem("authTokens")
    ? JSON.parse(localStorage.getItem("authTokens"))
    : null;

  const fetchUserDetails = useCallback(async () => {
    try {
      const res = await axios.get(
        `https://chatits.pythonanywhere.com/users/${id}/`,
        {
          headers: {
            Authorization: `Bearer ${authTokens?.access}`,
          },
        }
      );
      setUserDetails(res.data);
    } catch (err) {
      console.error("Profile fetch error:", err);
    } finally {
      setLoading(false);
    }
  }, [id, authTokens]);

  useEffect(() => {
    fetchUserDetails();
  }, [fetchUserDetails]);

  if (loading) {
    return (
      <div className="profile-loader">
        <div className="glow-loader"></div>
        <p>Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="profile-universe">

      {/* BACK BUTTON */}
      <button className="profile-back-btn" onClick={() => navigate(-1)}>
        <i className="bi bi-chevron-left"></i>
      </button>

      {/* PROFILE CARD */}
      <div className="profile-card-glass">
        <div className="profile-avatar-glow">
          <img
            src={
              userDetails.profile_picture ||
              "https://avatar.iran.liara.run/public"
            }
            alt="Profile"
          />
        </div>

        <h2 className="profile-name">
          {userDetails.firstname} {userDetails.lastname}
        </h2>

        <span className="profile-username">@{userDetails.username}</span>

        <div className="profile-status">
          <span className="status-dot"></span>
          {userDetails.status || "Online"}
        </div>

        <div className="profile-info-grid">
          <div className="info-box">
            <i className="bi bi-envelope"></i>
            <span>{userDetails.email}</span>
          </div>

          <div className="info-box">
            <i className="bi bi-person-badge"></i>
            <span>User ID: {userDetails.username}</span>
          </div>
        </div>

        <button
          className="start-chat-btn"
          onClick={() => navigate(`/chat/${id}`)}
        >
          <i className="bi bi-chat-dots-fill"></i>
          Start Chat
        </button>
      </div>
    </div>
  );
};

export default ViewProfile;