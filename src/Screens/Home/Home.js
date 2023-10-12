import React, { useState, useEffect } from 'react';
import './Home.css'; // You can create a CSS file for styling
import Searchbar from '../../Components/Searchbar/Searchbar';
import Footer from '../../Components/Footer/Footer';
import Card from '../../Components/Card/Card';
import axios from 'axios';

function HomeScreen() {

  const [categories, setCategories] = useState([]);
  const [stats, setStats] = useState([]);
  
  useEffect(() => {

    // get categories stats
    axios.get('https://anidexapi-production.up.railway.app/stats?table=animals&groupBy=category')
      .then((response) => {
        setStats(response.data.data);
        console.log(response.data.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });

    // get categories
    axios.get('https://anidexapi-production.up.railway.app/categories')
      .then((response) => {
        setCategories(response.data.categoryData);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div className="home-screen">
        <Searchbar/>
        <div className="card-container">
          {categories.map((item) => (
            <Card 
            key={item.id} 
            label={item.name}
            count={stats[item.name] ? stats[item.name].count : 0}
            />
          ))}
        </div>
        <Footer/>
    </div>
  );
}

export default HomeScreen;