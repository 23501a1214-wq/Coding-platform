// src/pages/Signup.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = () => {
    if (!username || !password) {
      alert("Please enter both username and password.");
      return;
    }

    let users = JSON.parse(localStorage.getItem("quizUsers")) || [];

    // Check if username already exists
    if (users.find(u => u.username === username)) {
      alert("Username already exists. Please choose another.");
      return;
    }

    const newUser = {
      username,
      password,
      stars: 0,
      points: 0,
      quizzes: 0,
      avg: 0,
      starsByTopic: {}
    };

    users.push(newUser);
    localStorage.setItem("quizUsers", JSON.stringify(users));
    localStorage.setItem("quizUser", JSON.stringify(newUser));

    alert("Signup successful!");
    navigate("/topics");
  };

  return (
    <div className="auth-page">
      <h2>Signup</h2>
      <input
        type="text"
        placeholder="Choose a username"
        value={username}
        onChange={e => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Choose a password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <button onClick={handleSignup}>Signup</button>
    </div>
  );
}
