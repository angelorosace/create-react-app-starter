import { useLocation } from "react-router-dom";
import React, { useState} from 'react';
import { BarLoader } from 'react-spinners';
import './Edit.css';
import { useNavigation } from '../../ContextProvider/NavigationContext';
import Axios from "axios";

function Edit() {
    const { state } = useLocation()
    const payload = state && state.payload
    const token = localStorage.getItem("authToken")
    const [formData, setFormData] = useState({
        id:'',
        category:'',
        name: '',
        taxonomy: '',
        etymology: '',
        geo: '',
        migration: '',
        habitat: '',
        dimensions: '',
        ds: '',
        diet: '',
        description: '',
      });
    
    const headers = {
      'Content-Type': 'application/json',
      'Authorization':`${token}`
    };

    const navigate = useNavigation();
    const [dataChanged,setDataChanged] = useState(false);
    
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
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);

    const populateFormData = () => {
        formData.id=payload.id
        formData.category=payload.category
        formData.name=payload.name
        formData.taxonomy=payload.taxonomy
        formData.etymology=payload.etymology
        formData.geo=payload.geo
        formData.migration=payload.migration
        formData.habitat=payload.habitat
        formData.dimensions=payload.dimensions
        formData.ds=payload.ds
        formData.diet=payload.diet
        formData.description=payload.description
    }

    const handleSubmit = async (e) => {
        formData.id = payload.id;

        if (!dataChanged) {
          console.log("nothing has changed")
          return
        } else {
          populateFormData();
        }
        setIsButtonDisabled(true);

      e.preventDefault();
      // Perform validation
      let isValid = true;

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

      // If there are errors, prevent submission
      if (!isValid) {
        setIsButtonDisabled(false);
        return;
      }

      try {
        var response = await Axios.put('https://anidexapi-production.up.railway.app/animal', formData, {headers});
        
        if (response.data.error === "Token is expired") {
          localStorage.clear()
          navigate("/")
          return
        }
        setIsButtonDisabled(false);
        navigate(-1);
      } catch (error) {
        // Handle errors
        console.error('Error:', error);
        setIsButtonDisabled(false);
      }
    }

    const handleInputChange = (e) => {
        setDataChanged(true);
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
        payload[name] = value;
      };

    return (
        <>
        {payload && <div className="animal-creation-form">
        <h1>Modifica Informazioni sull'animale</h1>
        <form>
          <div className="form-group">
            <label htmlFor="name">Categoria</label>
            <select 
              id="category"
              name="category"
              value={payload.category} 
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
              value={payload.name}
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
              value={payload.taxonomy}
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
              value={payload.etymology}
              onChange={handleInputChange}
            />
            <div className="error-message">{etymologyError}</div>
          </div>
          <div className="form-group">
            <label htmlFor="geo">Geografia</label>
            <input
              type="text"
              id="geo"
              name="geo"
              value={payload.geo}
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
              value={payload.migration}
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
              value={payload.habitat}
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
              value={payload.dimensions}
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
              value={payload.ds}
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
              value={payload.diet}
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
              value={payload.description}
              onChange={handleInputChange}
            />
          </div>
          <div className="update-buttons">
            {!isButtonDisabled && 
            <button type="button" onClick={handleSubmit} disabled={isButtonDisabled}>Salva</button>
            }
            {isButtonDisabled &&
                <BarLoader color={'blue'} loading={isButtonDisabled} className="spinner" />
            }
          </div>
        </form>
      </div>}
        </>
        
    )
}

export default Edit;