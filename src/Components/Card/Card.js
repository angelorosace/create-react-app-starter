import React from 'react';
import './Card.css';

function Card({ label, content }) {
  return (
    <div className="card">
      <div className="label">{label}</div>
      <div className="content">{content}</div>
    </div>
  );
}

export default Card;