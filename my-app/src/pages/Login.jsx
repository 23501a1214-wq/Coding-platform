// src/pages/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!username || !password) {
      alert("Please enter both username and password.");
      return;
    }

    let users = JSON.parse(localStorage.getItem("quizUsers")) || [];
    let existingUser = users.find(u => u.username === username);

    if (!existingUser) {
      alert("No account found with this username. Please sign up first.");
      return;
    }

    if (existingUser.password !== password) {
      alert("Incorrect password. Please try again.");
      return;
    }

    localStorage.setItem("quizUser", JSON.stringify(existingUser));
    alert("Login successful!");
    navigate("/topics");
  };

  return (
    <div className="auth-page">
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}
