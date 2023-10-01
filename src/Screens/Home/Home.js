import React from 'react';
import './Home.css'; // You can create a CSS file for styling
import Searchbar from '../../Components/Searchbar/Searchbar';
import Footer from '../../Components/Footer/Footer';
import Card from '../../Components/Card/Card';

function HomeScreen() {
  return (
    <div className="home-screen">
        <Searchbar/>
        <div className="card-container">
            <Card label="Card 1" />
            <Card label="Card 2" />
            <Card label="Card 3" />
            {/* Add more cards as needed */}
        </div>
        <Footer/>
    </div>
  );
}

export default HomeScreen;