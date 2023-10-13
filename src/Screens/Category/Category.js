import React,{ useEffect, useState }from 'react';
import { useParams } from 'react-router-dom';
import Axios from 'axios';
import Card from '../../Components/Card/Card';
import { useNavigation } from '../../ContextProvider/NavigationContext';


function Category() {
    const navigate = useNavigation();
    const { name } = useParams(); 
    const [animalsPerCategory, setanimalsPerCategory] = useState([]);

    useEffect(()=>{
      async function fetchAnimals() {
        if (!["Mammiferi","Uccelli","Insetti","Aracnidi","Invertebrati","Rettili","Anfibi","Pesci","Altro"].includes(name)){
          navigate("/not-found")
        }
  
        //get all animals in category
        try {
            var response = await Axios.get('https://anidexapi-production.up.railway.app/animals?category='+name+'&page=1');
            setanimalsPerCategory(response.data.data)
          } catch (error) {
            // Handle errors
            console.error('Error:', error);
          }
      }
      fetchAnimals()
    },[name,navigate])

    return (
        <div>
        <h2>Category {name}</h2>
        <div className="card-container">
          {animalsPerCategory.map((item) => (
            <Card 
            key={item.id}
            id={item.id} 
            label={item.name}
            photos={item.photos}
            />
          ))}
        </div>
        </div>
    );
}

export default Category;