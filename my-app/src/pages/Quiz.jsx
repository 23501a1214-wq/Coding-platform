// src/pages/Quiz.jsx
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import aimlData from "../data/aiml.json";
import dsData from "../data/ds.json";
import javaData from "../data/java.json";
import quantumData from "../data/quantum.json";
import reactData from "../data/react.json";
import cppData from "../data/cpp.json";
import pythonData from "../data/python.json";
import cyberData from "../data/cyber_security.json";

export default function Quiz() {
  const { topicId, level } = useParams();
  const navigate = useNavigate();

  const topicMap = {
    aiml: aimlData,
    ds: dsData,
    java: javaData,
    quantum: quantumData,
    react: reactData,
    cpp: cppData,
    python: pythonData,
    cyber_security: cyberData
  };

  const questions = topicMap[topicId]?.[level] || [];
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const currentQuestion = questions[current];

  const toggleOption = (option) => {
    if (submitted) return;

    if (currentQuestion.answer) {
      // single answer → radio
      setSelectedOptions([option]);
    } else if (currentQuestion.answers) {
      // multiple answers → checkboxes
      if (selectedOptions.includes(option)) {
        setSelectedOptions(selectedOptions.filter(o => o !== option));
      } else {
        setSelectedOptions([...selectedOptions, option]);
      }
    }
  };

  const handleSubmit = () => {
    let correct = false;

    if (currentQuestion.answer) {
      correct = selectedOptions.length === 1 && selectedOptions[0] === currentQuestion.answer;
    } else if (currentQuestion.answers) {
      const correctSet = new Set(currentQuestion.answers);
      const selectedSet = new Set(selectedOptions);
      correct =
        correctSet.size === selectedSet.size &&
        [...correctSet].every(ans => selectedSet.has(ans));
    }

    setIsCorrect(correct);
    if (correct) setScore(score + 1);
    setSubmitted(true);
  };

  const handleNext = () => {
    if (current + 1 < questions.length) {
      setCurrent(current + 1);
      setSelectedOptions([]);
      setSubmitted(false);
      setIsCorrect(false);
    } else {
      navigate(`/result/${topicId}/${level}`, {
        state: { score, total: questions.length }
      });
    }
  };

  if (questions.length === 0) {
    return <p>No questions found for {topicId} ({level}).</p>;
  }

  return (
    <div className="quiz">
      {/* Progress bar */}
      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{ width: `${((current + 1) / questions.length) * 100}%` }}
        ></div>
      </div>

      <h2>Topic: {topicId.toUpperCase()} ({level})</h2>
      <h3>Question {current + 1} of {questions.length}</h3>
      <p>
        {currentQuestion.question}{" "}
        {currentQuestion.answers && (
          <span className="multi-note">(Select all the right answers)</span>
        )}
      </p>

      <div className="options">
  {currentQuestion.options.map((opt, i) => {
    const isSelected = selectedOptions.includes(opt);
    let className = "";

    if (submitted) {
      if (currentQuestion.answer) {
        if (opt === currentQuestion.answer) className = "correct";
        else if (isSelected) className = "wrong";
      } else if (currentQuestion.answers) {
        if (currentQuestion.answers.includes(opt)) className = "correct";
        else if (isSelected) className = "wrong";
      }
    }

    return (
      <div key={i} className={`option-wrapper ${className}`}>
        <label className="option-label">
          <input
            type={currentQuestion.answer ? "radio" : "checkbox"}
            name={`question-${current}`}
            checked={isSelected}
            onChange={() => toggleOption(opt)}
            disabled={submitted}
          />
          {opt}
        </label>
      </div>
    );
  })}
</div>


      <div className="actions">
        {!submitted ? (
          <button onClick={handleSubmit}>Submit</button>
        ) : (
          <button onClick={handleNext}>Next</button>
        )}
      </div>

      {submitted && (
        <p className={isCorrect ? "feedback-correct" : "feedback-wrong"}>
          {isCorrect ? "✅ Correct!" : "❌ Incorrect"}
        </p>
      )}
    </div>
  );
}
