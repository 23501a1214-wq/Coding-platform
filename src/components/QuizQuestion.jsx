// src/components/QuizQuestion.jsx
import React from "react";

export default function QuizQuestion({ question, selectedOptions, onOptionChange }) {
  return (
    <div className="quiz-question">
      <h3>
        {question.question}{" "}
        {question.multiple && <span className="multi-note">(Select all the right answers)</span>}
      </h3>
      <div className="options">
        {question.options.map((option, idx) => (
          <label key={idx} className="option-label">
            <input
              type="checkbox"
              checked={selectedOptions.includes(option)}
              onChange={() => onOptionChange(option)}
            />
            {option}
          </label>
        ))}
      </div>
    </div>
  );
}
