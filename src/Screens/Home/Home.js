import React, { useState, useEffect } from 'react';
import './Home.css'; // You can create a CSS file for styling
import Searchbar from '../../Components/Searchbar/Searchbar';
import Footer from '../../Components/Footer/Footer';
import Card from '../../Components/Card/Card';
import axios from 'axios';
import { useNavigation } from '../../ContextProvider/NavigationContext';

function HomeScreen() {

  const navigate = useNavigation();
  const [categories, setCategories] = useState([]);
  const [stats, setStats] = useState([]);
  const token = localStorage.getItem("authToken");
  
  useEffect(() => {

    // get categories stats
    axios.get('https://anidexapi-production.up.railway.app/stats?table=animals&groupBy=category',{
      Authorization: `${token}`
    })
      .then((response) => {
        if (response.error === "Token is expired") {
          navigate("/")
        }
        setStats(response.data.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });

    // get categories
    axios.get('https://anidexapi-production.up.railway.app/categories',{
      Authorization: `${token}`
    })
      .then((response) => {
        if (response.error === "Token is expired") {
          navigate("/")
        }
        setCategories(response.data.categoryData);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [token,navigate]);

  return (
    <div className="home-screen">
        <Searchbar/>
        <div className="card-container">
          {categories.map((item) => (
            <Card 
            key={item.id}
            id={item.id} 
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