import React from "react";
import ".././pages/ExactUI.css";

const SignOut = ({ user, logout, minimalist = false }) => {
  const { username } = user;

  return (
    <div className={`profile-section ${minimalist ? 'minimalist' : 'full'} mt-auto`}>
      <div className="profile-card d-flex align-items-center p-2 rounded-4">
        {/* User Avatar */}
        <div className="profile-avatar-wrapper position-relative">
          <img
            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`}
            className="rounded-3"
            alt="profile"
            style={{ width: '40px', height: '40px', backgroundColor: '#3b82f6' }}
          />
          <span className="status-dot-online"></span>
        </div>

        {/* Text info - Hidden in minimalist mode (tiny sidebar) */}
        {!minimalist && (
          <>
            <div className="profile-text ms-3 flex-grow-1 overflow-hidden">
              <h6 className="mb-0 text-white small fw-bold text-truncate">{username}</h6>
              <small className="text-secondary x-small">Online</small>
            </div>
            
            {/* Logout Button */}
            <button onClick={logout} className="logout-icon-btn ms-2" title="Sign Out">
              <i className="bi bi-box-arrow-right"></i>
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default SignOut;
