// src/pages/Result.jsx
import React, { useEffect, useState } from "react";
import { useLocation, Link, useParams } from "react-router-dom";

export default function Result({ user, setUser }) {
  const { state } = useLocation();
  const { topicId } = useParams();
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (user) {
      const updatedUser = { ...user };
      updatedUser.points += state.score * 100;

      if (state.score === state.total) {
        updatedUser.stars += 1;
        setMessage(`🎉 Congratulations ${updatedUser.username}! You earned a star in ${topicId}!`);
      }

      // Update in quizUsers list
      let allUsers = JSON.parse(localStorage.getItem("quizUsers")) || [];
      allUsers = allUsers.map(u =>
        u.username === updatedUser.username ? updatedUser : u
      );

      // Save back both
      setUser(updatedUser);
      localStorage.setItem("quizUser", JSON.stringify(updatedUser));
      localStorage.setItem("quizUsers", JSON.stringify(allUsers));
    }
  }, [state, topicId, user, setUser]);

  return (
    <div className="result">
      <h2>Quiz Completed!</h2>
      <p>Your Score: <strong>{state.score} / {state.total}</strong></p>
      <p>Accuracy: {(state.score / state.total * 100).toFixed(1)}%</p>
      {message && <p className="congrats">{message}</p>}
      <Link to="/topics"><button>Choose Another Topic</button></Link>
    </div>
  );
}
