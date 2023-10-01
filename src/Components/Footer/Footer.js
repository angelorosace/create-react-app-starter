import React from 'react';
import './Footer.css'; // Import your CSS file here

function Footer() {
  return (
    <div className="footer">
      <div className="footer-buttons">
        <button className="footer-button">search</button>
        <button className="footer-button">add</button>
        <button className="footer-button">scan</button>
      </div>
    </div>
  );
}

export default Footer;