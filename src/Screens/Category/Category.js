import React,{ useEffect, useMemo }from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


function Category() {
    const navigate = useNavigate();
    const { name } = useParams(); 

    const expectedCategories = useMemo(() => {
        return ["Mammiferi","Uccelli","Insetti","Aracnidi","Invertebrati","Rettili","Anfibi","Pesci","Altro"]
        ;
      }, []);

    useEffect(()=>{
        if (!expectedCategories.includes(name)){
            navigate("/not-found")
        }
        //get all animals in category

    },[expectedCategories, name, navigate])

    return (
        <div>
        <h2>Category {name}</h2>
        </div>
    );
}

export default Category;