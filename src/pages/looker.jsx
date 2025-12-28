import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import ".././static/Looker.css";

const Looker = () => {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const authTokens = localStorage.getItem("authTokens")
    ? JSON.parse(localStorage.getItem("authTokens"))
    : null;

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    try {
      setLoading(true);
      const res = await axios.get(
        "https://chatits.pythonanywhere.com/search/",
        {
          headers: {
            Authorization: `Bearer ${authTokens?.access}`,
          },
          params: { query },
        }
      );

      setResult(res.data || []);
    } catch (err) {
      console.error(err);
      setResult([]);
    } finally {
      setLoading(false);
    }
  };

  const startChat = async (id) => {
    try {
      await axios.post(
        "https://chatits.pythonanywhere.com/friends/",
        { id },
        {
          headers: {
            Authorization: `Bearer ${authTokens?.access}`,
          },
        }
      );
      navigate(`/chat/${id}`);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="looker-universe">

      <motion.form
        onSubmit={handleSearch}
        className="search-box"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <input
          type="search"
          placeholder="Search username or User ID ✨"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </motion.form>

      <div className="results-zone">
        {loading && <div className="loader-glow" />}

        <AnimatePresence>
          {!loading &&
            result.map((user) => (
              <motion.div
                key={user.id}
                className="user-card"
                onClick={() => startChat(user.id)}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                whileHover={{ scale: 1.05 }}
              >
                <img
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}`}
                  alt="avatar"
                />
                <div>
                  <h6>{user.username}</h6>
                  <small>Tap to start chat 💬</small>
                </div>
              </motion.div>
            ))}
        </AnimatePresence>

        {!loading && result.length === 0 && (
          <p className="empty-state">🌌 No users found</p>
        )}
      </div>

      <div className="share-zone">
        <p>Share your User ID</p>
        <div className="socials">
          <i className="bi bi-whatsapp" />
          <i className="bi bi-instagram" />
          <i className="bi bi-facebook" />
        </div>
      </div>

    </div>
  );
};

export default Looker;