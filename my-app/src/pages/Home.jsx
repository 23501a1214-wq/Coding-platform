// src/pages/Home.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function Home({ user }) {
  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <h1>Welcome to QuizMaster 🎓</h1>
        {user ? (
          <p>Hello, <strong>{user.username}</strong>! Ready to earn more stars?</p>
        ) : (
          <p>Sharpen your skills and knowledge with interactive quizzes across multiple topics.</p>
        )}
        <Link to="/topics">
          <button className="cta-btn">Start Learning</button>
        </Link>
      </section>

      {/* Features Section */}
      <section className="features">
        <h2>Why QuizMaster?</h2>
        <div className="feature-grid">
          <div className="feature-card">
            <h3>📚 Diverse Topics</h3>
            <p>From Cyber Security to Quantum Computing, explore quizzes tailored to your interests.</p>
          </div>
          <div className="feature-card">
            <h3>⭐ Earn Stars</h3>
            <p>Perfect scores earn stars — track your progress and show off your achievements.</p>
          </div>
          <div className="feature-card">
            <h3>🏆 Leaderboard</h3>
            <p>Compete with friends and peers. See who’s leading in stars earned.</p>
          </div>
          <div className="feature-card">
            <h3>👤 Personalized Profile</h3>
            <p>Edit your profile, choose avatars, and keep track of your quiz history.</p>
          </div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="quick-links">
        <h2>Quick Links</h2>
        <div className="links-grid">
          <Link to="/topics"><button>📖 Topics</button></Link>
          <Link to="/leaderboard"><button>🏆 Leaderboard</button></Link>
          <Link to="/profile"><button>👤 Profile</button></Link>
          <Link to="/help"><button>❓ Help</button></Link>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta">
        <h2>Ready to test your knowledge?</h2>
        <Link to="/topics">
          <button className="cta-btn">Choose a Topic</button>
        </Link>
      </section>
    </div>
  );
}
