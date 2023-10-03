import React, { useState } from 'react';
import './AnimalCreationForm.css'; // Import the CSS file

function AnimalCreationForm({onClose}) {
  // Define state variables to store form input values
  const [formData, setFormData] = useState({
    photo: null,
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

  // Array of available icons
  const icons = [
    { id: 1, name: 'Icon 1' },
    { id: 2, name: 'Icon 2' },
    { id: 3, name: 'Icon 3' },
    { id: 4, name: 'Icon 4' },
    { id: 5, name: 'Icon 5' },
    { id: 6, name: 'Icon 6' },
    { id: 7, name: 'Icon 7' },
    { id: 8, name: 'Icon 8' },
    { id: 9, name: 'Icon 9' },
    { id: 10, name: 'Icon 10' },
  ];

  const [selectedIcons, setSelectedIcons] = useState([]);

  // Define error state variables for each field
  const [nameError, setNameError] = useState('');
  const [taxonomyError, setTaxonomyError] = useState('');
  const [etymologyError, setEtymologyError] = useState('');
  const [geoError, setGeoError] = useState('');
  const [migrationError, setMigrationError] = useState('');
  const [habitatError, setHabitatError] = useState('');
  const [dimensionsError, setDimensionsError] = useState('');
  const [dsError, setDSError] = useState('');
  const [dietError, setDietError] = useState('');

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
    setFormData({
      ...formData,
      iucn: [...formData.iucn,selectedIcons],
    });
  };

  // Handle photo upload
  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      photo: file,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    console.log(formData)

    e.preventDefault();
    // Perform validation
    let isValid = true;

    if (formData.name.trim() === '') {
      setNameError('Name is required');
      isValid = false;
    } else {
      setNameError('');
    }

    if (formData.taxonomy.trim() === '') {
      setTaxonomyError('Taxonomy is required');
      isValid = false;
    } else {
      setTaxonomyError('');
    }

    if (formData.etymology.trim() === '') {
      setEtymologyError('Etymology is required');
      isValid = false;
    } else {
      setEtymologyError('');
    }

    if (formData.geo.trim() === '') {
      setGeoError('Geo is required');
      isValid = false;
    } else {
      setGeoError('');
    }

    if (formData.migration.trim() === '') {
      setMigrationError('Geo is required');
      isValid = false;
    } else {
      setMigrationError('');
    }

    if (formData.habitat.trim() === '') {
      setHabitatError('Habitat is required');
      isValid = false;
    } else {
      setHabitatError('');
    }

    if (formData.dimensions.trim() === '') {
      setDimensionsError('Dimensions is required');
      isValid = false;
    } else {
      setDimensionsError('');
    }

    if (formData.ds.trim() === '') {
      setDSError('Ds is required');
      isValid = false;
    } else {
      setDSError('');
    }

    if (formData.diet.trim() === '') {
      setDietError('Diet is required');
      isValid = false;
    } else {
      setDietError('');
    }

    // If there are errors, prevent submission
    if (!isValid) {
      return;
    }

    // Process form data, including the uploaded photo
    console.log('Form data submitted:', formData);
  };

  return (
    <div className="animal-creation-form">
      <h1>Species Information Form</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="photo">Upload Photo</label>
          <input
            type="file"
            id="photo"
            name="photo"
            accept="image/*" // Allow only image files
            onChange={handlePhotoUpload}
          />
        </div>
        <div className="form-group">
          <label htmlFor="name">Name</label>
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
          <label htmlFor="taxonomy">Taxonomy</label>
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
          <label htmlFor="etymology">Etymology</label>
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
                  className={`icon ${selectedIcons.includes(icon.id) ? 'selected' : ''}`}
                  onClick={() => handleIconClick(icon.id)}
                >
                  {icon.name}
                </div>
              ))}
            </div>
            <div className="selected-icons">
              {selectedIcons.map((selectedIcon) => (
                <div key={selectedIcon} className="selected-icon">
                  Icon {selectedIcon}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="geo">Geo</label>
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
          <label htmlFor="migration">Migration</label>
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
          <label htmlFor="dimensions">Dimensions</label>
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
          <label htmlFor="ds">Ds</label>
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
          <label htmlFor="diet">Diet</label>
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
          <label htmlFor="diet">Description</label>
          <input
            type="text"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Add</button>
        <button type="button" className="cancel-button" onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
}

export default AnimalCreationForm;
