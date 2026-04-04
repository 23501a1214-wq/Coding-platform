// src/components/TopicCard.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function TopicCard({ topic }) {
  return (
    <div className="topic-card">
      <h3>{topic.name}</h3>
      <p>{topic.description}</p>
      <div className="difficulty-options">
        <Link to={`/quiz/${topic.id}/beginner`}><button className="beginner">10 Beginner</button></Link>
        <Link to={`/quiz/${topic.id}/advanced`}><button className="advanced">20 Advanced</button></Link>
      </div>
    </div>
  );
}
