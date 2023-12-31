import Axios from "axios";
import {useEffect, useState} from "react";
import { useParams } from 'react-router-dom';
import "./Animal.css";
import '@fortawesome/fontawesome-free/css/all.css';
import { useNavigation } from '../../ContextProvider/NavigationContext';


function Animal() {
    //const navigate = useNavigation();
    const { id } = useParams();
    const [animal,setAnimal] = useState({});
    const [imageSrc, setImageSrc] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [iucns, setIucns] = useState([]);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const [animalPhotoList,setPhotoList] = useState("");
    const token = localStorage.getItem("authToken");
    const navigate = useNavigation();
    const [isSuccessVisible, setSuccessVisible] = useState(false);
  const [isErrorVisible, setErrorVisible] = useState(false);

    const goToPrevious = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + imageSrc.length) % imageSrc.length);
    };
    
    const goToNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % imageSrc.length);
    };

    const headers = {
        'Authorization':`${token}`
      };

    const onDelete = async () => {
        setIsButtonDisabled(true);
        try {
            var response = await Axios.delete('https://anidexapi-production.up.railway.app/animal?id='+id+'&photos='+animalPhotoList, {headers});
            
            if (response.data.error === "Token is expired") {
                localStorage.clear()
                navigate("/")
                return
            }
            setSuccessVisible(true)
            setTimeout(() => {
                setSuccessVisible(false);
                navigate("/Home")
            }, 2000);
            setIsButtonDisabled(false); 
        } catch (error) {
            // Handle errors
            console.error('Error:', error);
            setIsButtonDisabled(false);
            setErrorVisible(true)
            setTimeout(() => {
                setErrorVisible(false);
              }, 2000);
        }
      };

    const onModify = () => {
        navigate(`/Edit`,{ state: { payload: animal } })
    }

    useEffect(()=>{
        if (!token) {
            navigate("/")
        }
        async function fetchAnimalInfo() {
            try{
                var response = await Axios.get('https://anidexapi-production.up.railway.app/animals?id='+id,{
                    headers: {
                      'Authorization': `${token}`
                    }
                  })
                if (response.data.error === "Token is expired") {
                    localStorage.clear()
                    navigate("/")
                    return
                }
                setAnimal(response.data.data)



            } catch (error){
                console.error(error)
            }

            setIucns(response.data.data.iucn.split(","))

            var photosList = response.data.data.photo.split(",")
            setPhotoList(photosList)
            photosList.forEach(async (photo) => {
                try {
                    var resp = await Axios.get("https://anidexapi-production.up.railway.app/images?photo="+photo,{
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
                    const objectURL = URL.createObjectURL(resp.data);
                    setImageSrc((imageSrc) => [...imageSrc, objectURL]);
                } catch (error){
                    console.error('Error:', error)
                }
            });

        }
        fetchAnimalInfo()
    },[id,token,navigate])

    return(
        <div>
            {animal && !isSuccessVisible && !isErrorVisible &&
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
                {imageSrc && imageSrc.length > 1 && 
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
                        <div className="icon-scroll-container-horizontal">
                            {iucns.map((icon) => (
                                <div
                                    id={icon}
                                    key={icon}
                                    className={`icon ${icon} icon-h`}
                                >
                                    {icon}
                                </div>
                            ))}
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
                <div className="button-container">
                    <button type="button" className="delete-button" onClick={onDelete} disabled={isButtonDisabled}>Elimina</button>
                    <button type="button" className="modify-button" onClick={onModify} >Modifica</button>
                </div>
            </div>
            }
            <div className="message-container">
            {isSuccessVisible && (
                <div className="success-message">
                <i className="fas fa-check-circle fa-5x"></i>
                <p className="success-text">Specie animale eliminata!</p>
                </div>
            )}
            {isErrorVisible && (
                <div className="error-feedback">
                <i className="fas fa-exclamation-circle fa-5x"></i>
                <p className="error-text">Qualcosa e' andato storto!</p>
                </div>
            )}
            </div>
        </div>
    )
}

export default Animal;