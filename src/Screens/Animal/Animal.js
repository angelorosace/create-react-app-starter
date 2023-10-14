import Axios from "axios";
import {useEffect, useState} from "react";
import { useParams } from 'react-router-dom';
import "./Animal.css";
import '@fortawesome/fontawesome-free/css/all.css';


function Animal() {
    const { id } = useParams();
    const [animal,setAnimal] = useState({});
    const [imageSrc, setImageSrc] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    const goToPrevious = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + imageSrc.length) % imageSrc.length);
        console.log(currentIndex)
    };
    
    const goToNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % imageSrc.length);
        console.log(currentIndex)
    };

    useEffect(()=>{
        async function fetchAnimalInfo() {
            try{
                var response = await Axios.get('https://anidexapi-production.up.railway.app/animals?id='+id)
                setAnimal(response.data.data)

                var photosList = response.data.data.photo.split(",")
                photosList.forEach(async (photo) => {
                    try {
                        console.log("ccc")
                        var resp = await Axios.get("https://anidexapi-production.up.railway.app/images?photo="+photo,{
                        responseType: 'blob',
                        })
                        const objectURL = URL.createObjectURL(resp.data);
                        setImageSrc((imageSrc) => [...imageSrc, objectURL]);
                    } catch (error){
                        console.error('fetch images error', error)
                    }
                });
            } catch (error){
                console.error("fetch animal error",error)
            }

        }
        fetchAnimalInfo()
    },[id])

    return(
        <div>
            {animal &&
            <div>
                <div className="divs-container-vertical">
                        <div className="name">{animal.name}</div>
                </div>
                <div className="picture-container">
                    <div className="slideshow">
                    {imageSrc && 
                        <div className="slideshow-container">
                            <img src={imageSrc[currentIndex]} alt={`${currentIndex + 1}`} className="slideshow-image" />
                        </div>
                    }
                    {!imageSrc && 
                        <div className="loading-spinner">
                            <i className="fas fa-spinner"></i>
                        </div>
                    }
                    </div>
                </div>
                {imageSrc && 
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <button className="butt prev" onClick={goToPrevious}>&#8249;</button>
                        <button className="butt next" onClick={goToNext}>&#8250;</button>
                    </div>
                }
                <div className="container">
                    <div className="divs-container-vertical">
                        <div className="title">Categoria</div>
                        <div className="info">{animal.category}</div>
                        <div className="title">IUCN</div>
                        <div className="icon-scroll-container">
                            <div className="icons">
                                {animal.iucn.split(",").map((icon) => (
                                    <div
                                        key={icon.id}
                                        className={`icon ${icon}`}
                                    >
                                        {icon}
                                    </div>
                                ))}
                            </div>
                        </div>
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