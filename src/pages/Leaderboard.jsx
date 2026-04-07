// src/pages/Leaderboard.jsx
import React, { useEffect, useState } from "react";
import LeaderboardRow from "../components/LeaderboardRow";

export default function Leaderboard({ user }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("quizUsers")) || [];
    setUsers(storedUsers);
  }, []);

  return (
    <div className="leaderboard">
      <h2>Leaderboard</h2>
      <p>Ranked by stars earned ✨</p>
      {users.length === 0 ? (
        <p>No users yet. Complete a quiz to appear here!</p>
      ) : (
        <div className="leaderboard-list">
          {users
            .sort((a, b) => (b.stars || 0) - (a.stars || 0))
            .map((u, index) => (
              <LeaderboardRow
                key={u.username}
                user={u}
                rank={index + 1}
                highlight={user && u.username === user.username}
              />
            ))}
        </div>
      )}
    </div>
  );
}

