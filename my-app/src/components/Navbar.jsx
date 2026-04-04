// src/components/Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function Navbar({ user }) {
  return (
    <nav className="navbar">
      <h1 className="logo">QuizMaster 🎓</h1>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/topics">Topics</Link>
        <Link to="/leaderboard">Leaderboard</Link>
        <Link to="/help">Help</Link>
        {user && <Link to="/profile">Profile</Link>}
      </div>
      <div className="auth-buttons">
        {user ? (
          <span className="username-highlight">👤 {user.username}</span>
        ) : (
          <>
            <Link to="/login">
              <button className="login-btn">Login</button>
            </Link>
            <Link to="/signup">
              <button className="signup-btn">Signup</button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
