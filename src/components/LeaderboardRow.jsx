// src/components/LeaderboardRow.jsx
import React from "react";

export default function LeaderboardRow({ user, rank }) {
  const badge = rank === 1 ? "Champion" : rank === 2 ? "Runner-up" : rank === 3 ? "Third Place" : null;
  return (
    <div className="leaderboard-row">
      <span>#{rank}</span>
      <strong>{user.username}</strong> {badge && <em>({badge})</em>}
       <span className="stars">⭐ {user.stars || 0}</span>
    </div>
  );
}
