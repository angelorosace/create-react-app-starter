import React from 'react';
import './Card.css';

function Card({ label, content, count }) {
  return (
    <div className="card">
      <div className="label">{label}</div>
      <div className="content">{content}</div>
      <span>{count}</span>
    </div>
  );
}

export default Card;