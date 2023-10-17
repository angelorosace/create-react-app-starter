import React, { useState} from 'react';
import './AnimalCreationForm.css'; // Import the CSS file
import '@fortawesome/fontawesome-free/css/all.css';
import Axios from 'axios';
import { BarLoader } from 'react-spinners';
import { useNavigation } from '../../ContextProvider/NavigationContext';

function AnimalCreationForm({onClose}) {
  // Define state variables to store form input values
  const navigate = useNavigation();
  const token = localStorage.getItem("authToken");
  const [formData, setFormData] = useState({
    photo: [],
    category:'',
    name: '',
    taxonomy: '',
    etymology: '',
    iucn: [],
    geo: '',
    migration: '',
    habitat: '',
    dimensions: '',
    ds: '',
    diet: '',
    description: '',
  });

  const headers = {
    'Content-Type': 'multipart/form-data',
    'Authorization':`${token}`
  };

  // Array of available icons
  const icons = [
    { id: 'CR', name: 'CR' },
    { id: 'EN', name: 'EN' },
    { id: 'VU', name: 'VU' },
    { id: 'NT', name: 'NT' },
    { id: 'LC', name: 'LC' },
    { id: 'NE', name: 'NE' },
  ];

  const [selectedIcons, setSelectedIcons] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);

  // Define error state variables for each field
  const [selectedFilesError, setSelectedFilesError] = useState('');
  const [categoryError, setCategoryError] = useState('');
  const [nameError, setNameError] = useState('');
  const [taxonomyError, setTaxonomyError] = useState('');
  const [etymologyError, setEtymologyError] = useState('');
  const [geoError, setGeoError] = useState('');
  const [migrationError, setMigrationError] = useState('');
  const [habitatError, setHabitatError] = useState('');
  const [dimensionsError, setDimensionsError] = useState('');
  const [dsError, setDSError] = useState('');
  const [dietError, setDietError] = useState('');

  const [isFormVisible, setFormVisible] = useState(true);
  const [isSuccessVisible, setSuccessVisible] = useState(false);
  const [isErrorVisible, setErrorVisible] = useState(false);

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Function to handle icon selection
  const handleIconClick = (iconId) => {
    if (selectedIcons.includes(iconId)) {
      // If double-clicked, remove the icon from the array
      const updatedIcons = selectedIcons.filter((id) => id !== iconId);
      setSelectedIcons(updatedIcons);
    } else {
      // If single-clicked, add the icon to the array
      setSelectedIcons([...selectedIcons, iconId]);
    }
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files).slice(0, 5); // Limit to 5 files
    setSelectedFiles(files);
  };

  const removeFile = (index) => {
    const newFiles = [...selectedFiles];
    newFiles.splice(index, 1);
    setSelectedFiles(newFiles);
  };

  // Handle form submission
  const handleSubmit = async (e) => {

    setIsButtonDisabled(true);

    e.preventDefault();
    // Perform validation
    let isValid = true;

    formData.photo = selectedFiles;

    if (formData.photo.length === 0) {
      setSelectedFilesError('Ho bisogno di almeno una foto');
      isValid = false;
    } else {
      setSelectedFilesError('');
    }

    if (formData.category.trim() === '' || formData.category === '-') {
      setCategoryError("Seleziona una categoria")
      isValid = false
    } else {
      setCategoryError("")
    }

    if (formData.name.trim() === '') {
      setNameError('Manca il nome');
      isValid = false;
    } else {
      setNameError('');
    }

    if (formData.taxonomy.trim() === '') {
      setTaxonomyError('Tassonomia?');
      isValid = false;
    } else {
      setTaxonomyError('');
    }

    if (formData.etymology.trim() === '') {
      setEtymologyError('No Etimologia?');
      isValid = false;
    } else {
      setEtymologyError('');
    }

    if (formData.geo.trim() === '') {
      setGeoError('Geoooooo');
      isValid = false;
    } else {
      setGeoError('');
    }

    if (formData.migration.trim() === '') {
      setMigrationError('Non migra sto qui?');
      isValid = false;
    } else {
      setMigrationError('');
    }

    if (formData.habitat.trim() === '') {
      setHabitatError("Vive nell'iperuranio?");
      isValid = false;
    } else {
      setHabitatError('');
    }

    if (formData.dimensions.trim() === '') {
      setDimensionsError('Immettere dimensioni');
      isValid = false;
    } else {
      setDimensionsError('');
    }

    if (formData.ds.trim() === '') {
      setDSError('Dimorfismo?');
      isValid = false;
    } else {
      setDSError('');
    }

    if (formData.diet.trim() === '') {
      setDietError('Non mangia?');
      isValid = false;
    } else {
      setDietError('');
    }

    formData.iucn = selectedIcons;

    // If there are errors, prevent submission
    if (!isValid) {
      setIsButtonDisabled(false);
      return;
    }

    try {
      var response = await Axios.post('https://anidexapi-production.up.railway.app/animal', formData, {headers});
      
      setFormVisible(false);
      if (response.error === "Token is expired") {
        navigate("/")
      }

      setSuccessVisible(true);
      setIsButtonDisabled(false);
    } catch (error) {
      // Handle errors
      console.error('Error:', error);

      setFormVisible(false);
      setErrorVisible(true);
      setIsButtonDisabled(false);
    }

    setTimeout(() => {
      onClose();
    }, 3000);
  };

  return (
    <div>
      {isFormVisible && (
        <div className="animal-creation-form">
        <h1>Informazioni sull'animale</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="photo">Foto</label>
            <input type="file" id="photo" name="photo" accept="image/*" multiple onChange={handleFileChange} />
            {selectedFiles.length > 0 && (
              <div className="image-preview">
                <div className="preview-container">
                  {selectedFiles.map((file, index) => (
                    <div key={index} className='file'>
                    <div className="file-wrapper"> {/* Add a wrapper */}
                    <img
                      key={index}
                      src={URL.createObjectURL(file)}
                      alt={`Preview ${index}`}
                      className="preview-image" // Add a CSS class
                    />
                    <i
                    className="fas fa-times remove-icon"
                    onClick={() => removeFile(index)}
                    ></i>
                  </div>
                  </div>   
                  ))}   
                </div>
              </div>
            )}
            <div className="error-message">{selectedFilesError}</div>
          </div>
          <div className="form-group">
            <label htmlFor="name">Categoria</label>
            <select 
              id="category"
              name="category"
              value={formData.category} 
              onChange={handleInputChange}
            >
              <option value="0">-</option>
              <option value="Mammiferi">Mammiferi</option>
              <option value="Uccelli">Uccelli</option>
              <option value="Insetti">Insetti</option>
              <option value="Aracnidi">Aracnidi</option>
              <option value="Invertebrati">Invertebrati</option>
              <option value="Rettili">Rettili</option>
              <option value="Anfibi">Anfibi</option>
              <option value="Pesci">Pesci</option>
              <option value="Altro">Altro</option>
            </select>
            <div className="error-message">{categoryError}</div>
          </div>
          <div className="form-group">
            <label htmlFor="name">Nome</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
            <div className="error-message">{nameError}</div>
          </div>
          <div className="form-group">
            <label htmlFor="taxonomy">Taxon</label>
            <input
              type="text"
              id="taxonomy"
              name="taxonomy"
              value={formData.taxonomy}
              onChange={handleInputChange}
            />
            <div className="error-message">{taxonomyError}</div>
          </div>
          <div className="form-group">
            <label htmlFor="etymology">Etimologia</label>
            <input
              type="text"
              id="etymology"
              name="etymology"
              value={formData.etymology}
              onChange={handleInputChange}
            />
            <div className="error-message">{etymologyError}</div>
          </div>
          <div className="form-group">
            <label htmlFor="iucn">IUCN</label>
            <div className="icon-scroll-container">
              <div className="icons">
                {icons.map((icon) => (
                  <div
                    key={icon.id}
                    className={`icon ${selectedIcons.includes(icon.id) ? 'selected' : ''} ${icon.id}`}
                    onClick={() => handleIconClick(icon.id)}
                  >
                    {icon.name}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="geo">Geografia</label>
            <input
              type="text"
              id="geo"
              name="geo"
              value={formData.geo}
              onChange={handleInputChange}
            />
            <div className="error-message">{geoError}</div>
          </div>
          <div className="form-group">
            <label htmlFor="migration">Migrazione</label>
            <input
              type="text"
              id="migration"
              name="migration"
              value={formData.migration}
              onChange={handleInputChange}
            />
            <div className="error-message">{migrationError}</div>
          </div>
          <div className="form-group">
            <label htmlFor="habitat">Habitat</label>
            <input
              type="text"
              id="habitat"
              name="habitat"
              value={formData.habitat}
              onChange={handleInputChange}
            />
            <div className="error-message">{habitatError}</div>
          </div>
          <div className="form-group">
            <label htmlFor="dimensions">Dimensioni</label>
            <input
              type="text"
              id="dimensions"
              name="dimensions"
              value={formData.dimensions}
              onChange={handleInputChange}
            />
            <div className="error-message">{dimensionsError}</div>
          </div>
          <div className="form-group">
            <label htmlFor="ds">Dimorfismo Sessuale</label>
            <input
              type="text"
              id="ds"
              name="ds"
              value={formData.ds}
              onChange={handleInputChange}
            />
            <div className="error-message">{dsError}</div>
          </div>
          <div className="form-group">
            <label htmlFor="diet">Dieta</label>
            <input
              type="text"
              id="diet"
              name="diet"
              value={formData.diet}
              onChange={handleInputChange}
            />
            <div className="error-message">{dietError}</div>
          </div>
          <div className="form-group">
            <label htmlFor="description">Curiosità</label>
            <input
              type="text"
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
            />
          </div>
          {!isButtonDisabled && 
          <button type="submit" disabled={isButtonDisabled}>Aggiungi</button>
          }
          {!isButtonDisabled && 
          <button type="button" className="cancel-button" onClick={onClose} disabled={isButtonDisabled}>Chiudi</button>
          }
          {isButtonDisabled &&
            <BarLoader color={'blue'} loading={isButtonDisabled} className="spinner" />
          }
        </form>
      </div>
      )
    };
    {isSuccessVisible && (
        <div className="success-message">
          <i className="fas fa-check-circle fa-5x"></i>
          <p className="success-text">Nuova specie animale correttamente aggiunta all'Anidex!</p>
        </div>
    )};
    {isErrorVisible && (
      <div className="error-feedback">
        <i className="fas fa-exclamation-circle fa-5x"></i>
        <p className="error-text">Qualcosa e' andato storto!</p>
      </div>
    )};
    </div>
    
  );
}

export default AnimalCreationForm;
