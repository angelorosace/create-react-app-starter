import React from 'react';
import './Home.css'; // You can create a CSS file for styling
import Searchbar from '../../Components/Searchbar/Searchbar';
import Footer from '../../Components/Footer/Footer';
import Card from '../../Components/Card/Card';
import axios from 'axios';

function HomeScreen() {

  const [categories, setCategories] = useState([]);
  
  useEffect(() => {
    const apiUrl = 'https://anidexapi-production.up.railway.app/categories';

    axios.get(apiUrl)
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
            <Card key={item.id} label={item.name}/>
          ))}
        </div>
        <Footer/>
    </div>
  );
}

export default HomeScreen;