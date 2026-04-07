// src/pages/Help.jsx
import React from "react";
import FAQAccordion from "../components/FAQAccordion";

const faqs = [
  { question: "How do I start a quiz?", answer: "Go to the Topics page, select a subject, and choose Beginner or Advanced level." },
  { question: "How are stars earned?", answer: "You earn a star when you achieve a perfect score in a quiz." },
  { question: "How does the leaderboard work?", answer: "The leaderboard ranks users by stars earned, showing the highest first." },
  { question: "Can I edit my profile?", answer: "Yes, click your username in the Navbar to access your profile page where you can edit info." },
  { question: "How do I log out?", answer: "Go to your Profile page and click the Logout button." }
];

export default function Help() {
  return (
    <div className="help-page">
      <h2>Help & FAQs</h2>
      <FAQAccordion faqs={faqs} />

      {/* Modern contact section */}
      <div className="contact-card">
        <h3>Need more details?</h3>
        <p>We’re here to help you out. Reach us anytime through:</p>
        <div className="contact-options">
          <a href="mailto:support@quizapp.com" className="contact-link">
            📧 Email Support
          </a>
          <a href="https://quizapp.com/contact" target="_blank" rel="noopener noreferrer" className="contact-link">
            🌐 Contact Form
          </a>
          <a href="https://quizapp.com/community" target="_blank" rel="noopener noreferrer" className="contact-link">
            💬 Community Forum
          </a>
        </div>
      </div>
    </div>
  );
}
