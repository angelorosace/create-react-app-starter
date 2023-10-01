import React from 'react';
import './Footer.css'; // Import your CSS file here
import '@fortawesome/fontawesome-free/css/all.css';

function Footer() {
    return (
        <div className="footer">
          <div className="footer-buttons">
            <button className="footer-button right">
                <i className="fas fa-plus"></i>
            </button>
          </div>
        </div>
      );
}

export default Footer;