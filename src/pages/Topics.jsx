// src/pages/Topics.jsx
import React from "react";
import TopicCard from "../components/TopicCard";

const topics = [
  { id: "cyber_security", name: "Cyber Security", description: "Threats, defenses, and best practices." },
  { id: "react", name: "React", description: "Master React concepts from fundamentals to advanced patterns." },
  { id: "cpp", name: "C++", description: "Test your knowledge of C++ programming concepts and advanced techniques." },
  { id: "python", name: "Python", description: "Challenge yourself with Python basics, libraries, and problem-solving." },
  { id: "quantum", name: "Quantum Computing", description: "Explore qubits, superposition, entanglement, and algorithms." },
  { id: "aiml", name: "AI & Machine Learning", description: "Dive into supervised, unsupervised, reinforcement learning, and deep learning." },
  { id: "ds", name: "Data Structures", description: "Understand arrays, stacks, queues, trees, graphs, and algorithms." },
  { id: "java", name: "Java", description: "Learn Java fundamentals, OOP concepts, collections, and advanced features." }
];

export default function Topics() {
  return (
    <div className="topics">
      <h2>Choose Your Topic</h2>
      <div className="topic-grid">
        {topics.map(t => (
          <TopicCard key={t.id} topic={t} />
        ))}
      </div>
    </div>
  );
}
