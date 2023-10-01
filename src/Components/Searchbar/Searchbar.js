import React from 'react';
import './Searchbar.css'; // Import your CSS file here
import '@fortawesome/fontawesome-free/css/all.css';

function Searchbar() {
  return (
    <div className="search-bar">
      <i className="fas fa-search search-icon"></i>
      <input
        type="text"
        placeholder="Search..."
        className="search-input"
      />
    </div>
  );
}

export default Searchbar;