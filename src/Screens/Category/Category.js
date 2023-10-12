import React,{ useEffect }from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


function Category() {
    const navigate = useNavigate();
    const { name } = useParams(); 
    const expectedCategories = ["Mammiferi","Uccelli","Insetti","Aracnidi","Invertebrati","Rettili","Anfibi","Pesci","Altro"]

    useEffect(()=>{
        if (!expectedCategories.includes(name)){
            navigate("/not-found")
        }
        //get all animals in category
        
    },[])

    return (
        <div>
        <h2>Category {name}</h2>
        </div>
    );
}

export default Category;