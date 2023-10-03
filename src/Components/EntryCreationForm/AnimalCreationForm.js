import React, { useState } from 'react';

function AnimalCreationForm() {
  // Define state variables to store form input values
  const [formData, setFormData] = useState({
    photo: null,
    name: '',
    taxonomy: '',
    etymology: '',
    iucn: '',
    geo: '',
    migration: '',
    habitat: '',
    dimensions: '',
    ds: '',
    diet: '',
    description: '',
  });

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
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
    e.preventDefault();
    // Process form data, e.g., send it to an API or perform validation
    console.log('Form data submitted:', formData);
  };

  return (
    <div className="animal-creation-form">
      <h1>Species Information Form</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="photo">Upload Photo:</label>
          <input
            type="file"
            id="photo"
            name="photo"
            accept="image/*" // Allow only image files
            onChange={handlePhotoUpload}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="taxonomy">Taxonomy:</label>
          <input
            type="text"
            id="taxonomy"
            name="taxonomy"
            value={formData.taxonomy}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="etymology">Etymology:</label>
          <input
            type="text"
            id="etymology"
            name="etymology"
            value={formData.etymology}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="iucn">IUCN:</label>
          <select
            id="iucn"
            name="iucn"
            value={formData.iucn}
            onChange={handleInputChange}
            required
          >
            <option value="Least Concern">Least Concern</option>
            <option value="Near Threatened">Near Threatened</option>
            <option value="Vulnerable">Vulnerable</option>
            <option value="Endangered">Endangered</option>
            {/* Add more options as needed */}
          </select>
        </div>
        {/* Add similar form groups for the remaining fields */}
        {/* ... */}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AnimalCreationForm;
