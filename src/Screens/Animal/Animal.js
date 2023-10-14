import Axios from "axios";
import {useEffect, useState} from "react";
import { useParams } from 'react-router-dom';
import "./Animal.css";
import '@fortawesome/fontawesome-free/css/all.css';
//import { useNavigation } from '../../ContextProvider/NavigationContext';


function Animal() {
    //const navigate = useNavigation();
    const { id } = useParams();
    const [animal,setAnimal] = useState({})
    const [imageSrc, setImageSrc] = useState('');

    useEffect(()=>{
        async function fetchAnimalInfo() {
            try{
                var response = await Axios.get('https://anidexapi-production.up.railway.app/animals?id='+id)
                setAnimal(response.data.data)
            } catch (error){
                console.error(error)
            }

            var photosList = response.data.data.photo.split(",")

            try {
                var resp = await Axios.get("https://anidexapi-production.up.railway.app/images?photo="+photosList[0],{
                  responseType: 'blob',
                })
                const objectURL = URL.createObjectURL(resp.data);
                setImageSrc(objectURL);
            } catch (error){
                console.error('Error:', error)
            }
        }
        fetchAnimalInfo()
    },[id])

    return(
        <div>
            {animal &&
            <div>
                <div className="container">
                    <div className="image-container">
                    {imageSrc && <img src={imageSrc} alt="alt" />}
                    {!imageSrc && 
                        <div className="loading-spinner">
                            <i className="fas fa-spinner"></i>
                        </div>
                    }
                    </div>
                    <div className="divs-container-vertical">
                        <div className="name">{animal.name}</div>
                        <div className="div">{animal.category}</div>
                        <div className="div">{animal.iucn}</div>
                    </div>
                </div>
                <div className="container">
                    <div className="divs-container-vertical">
                        <div className="title">Tassonomia</div>
                        <div className="info">{animal.taxonomy}</div>
                        <div className="title">Etimologia</div>
                        <div className="info">{animal.etymology}</div>
                        <div className="title">Geo</div>
                        <div className="info">{animal.geo}</div>
                        <div className="title">Habitat</div>
                        <div className="info">{animal.habitat}</div>
                        <div className="title">Dimensioni</div>
                        <div className="info">{animal.dimensions}</div>
                        <div className="title">Dimorfismo Sessuale</div>
                        <div className="info">{animal.ds}</div>
                        <div className="title">Dieta</div>
                        <div className="info">{animal.diet}</div>
                        <div className="title">Curiosità</div>
                        <div className="info">{animal.description}</div>
                    </div>
                </div>
            </div>
            }
        </div>
    )
}

export default Animal;