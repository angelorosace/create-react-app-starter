import React from 'react';
import './Card.css';
import { useNavigate } from 'react-router-dom';

function Card({ id, label, content, count }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/category/${label}`);
  }

  return (
    <div className="card" onClick={handleClick}>
      <div className="label">{label}</div>
      <div className="content">{content}</div>
      <span>{count}</span>
    </div>
  );
}

export default Card;