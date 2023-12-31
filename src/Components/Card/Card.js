import React,{useState,useEffect} from 'react';
import './Card.css';
import { useNavigation } from '../../ContextProvider/NavigationContext';
import Axios from 'axios';
import '@fortawesome/fontawesome-free/css/all.css';

function Card({ id, label, content, count, photos }) {
  const navigate = useNavigation();

  const [imageSrc, setImageSrc] = useState('');
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    if (!token) {
      navigate("/")
    }
    async function setup(){
      if (photos) {

        var photosList = photos.split(",")
  
        try {
          var response = await Axios.get("https://anidexapi-production.up.railway.app/images?photo="+photosList[0],{
            responseType: 'blob',
              headers: {
                'Authorization': `${token}`
              }
            }
          )

          if (response.data.error === "Token is expired") {
            localStorage.clear()
            navigate("/")
            return
        }

          const objectURL = URL.createObjectURL(response.data);
          setImageSrc(objectURL);
        } catch (error){
          console.error('Error:', error)
        }
      }
    }
    setup()
  }, [photos,navigate,token]);

  const handleCategoryClick = () => {
    navigate(`/category/${label}`);
  }

  const handleAnimalClick = () => {
    navigate(`${window.location.pathname}/animal/${id}`);
  }

  /*
  
  */

  return (
    <>
    {imageSrc && 
      <div className="card" style={{
        backgroundImage:"url('"+imageSrc+"')",
        backgroundPosition:"center",
        backgroundSize:"cover"
        }}
        onClick={handleAnimalClick}>
        <div className="label-photo">{label}</div>
        <div className="content">{content}</div>
        <span>{count}</span>
      </div>
    }
    {!imageSrc && photos &&
      <div className="card">
        <div className="loading-spinner">
          <i className="fas fa-spinner"></i>
        </div>
        <div className="label-photo">{label}</div>
        <div className="content">{content}</div>
        <span>{count}</span>
      </div>
    }
    {!imageSrc && !photos &&
      <div className="card card-category" onClick={handleCategoryClick}>
        <div className="label">{label}</div>
        <div className="content">{content}</div>
        <span className='count'>{count}</span>
      </div>
    }
    </>
    
  );
}

export default Card;