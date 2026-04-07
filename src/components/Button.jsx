// src/components/Button.jsx
import React from "react";

export default function Button({ onClick, children, type="button" }) {
  return (
    <button 
      type={type} 
      onClick={onClick} 
      style={{ padding: "10px 16px", margin: "5px", borderRadius: 6 }}
    >
      {children}
    </button>
  );
}
