import React, { useState } from 'react';
import './Symptoms.css';
import Navbar from '../../components/Navbar/Navbar';

const Symptoms = () => {
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [intensityValues, setIntensityValues] = useState({});
  const [notes, setNotes] = useState('');

  const symptomCategories = [
    {
      name: 'Physical',
      symptoms: ['Cramps', 'Headache', 'Breast tenderness', 'Bloating', 'Fatigue', 'Acne']
    },
    {
      name: 'Emotional',
      symptoms: ['Mood swings', 'Anxiety', 'Irritability', 'Depression', 'Crying spells']
    },
    {
      name: 'Digestive',
      symptoms: ['Nausea', 'Food cravings', 'Appetite changes', 'Constipation', 'Diarrhea']
    }
  ];

  const toggleSymptom = (symptom) => {
    if (selectedSymptoms.includes(symptom)) {
      setSelectedSymptoms(selectedSymptoms.filter(s => s !== symptom));
      const newIntensity = {...intensityValues};
      delete newIntensity[symptom];
      setIntensityValues(newIntensity);
    } else {
      setSelectedSymptoms([...selectedSymptoms, symptom]);
      setIntensityValues({...intensityValues, [symptom]: 1});
    }
  };

  const handleIntensityChange = (symptom, value) => {
    setIntensityValues({...intensityValues, [symptom]: value});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const symptomData = {
      date: new Date().toISOString(),
      symptoms: selectedSymptoms.map(symptom => ({
        name: symptom,
        intensity: intensityValues[symptom]
      })),
      notes
    };
    
    console.log('Submitted symptom data:', symptomData);
    
    setSelectedSymptoms([]);
    setIntensityValues({});
    setNotes('');
    alert('Symptoms logged successfully!');
  };

  return (
    <div className="symptoms-page">
      <Navbar />
      <div className="symptoms-content">
        <div className="symptoms-header">
          <h1>Log Your Symptoms</h1>
          <p>Track how you feel throughout your cycle</p>
        </div>
        
        <form className="symptoms-form" onSubmit={handleSubmit}>
          <div className="symptom-categories">
            {symptomCategories.map((category) => (
              <div key={category.name} className="symptom-category">
                <h3>{category.name}</h3>
                <div className="symptom-buttons">
                  {category.symptoms.map(symptom => (
                    <button
                      key={symptom}
                      type="button"
                      className={`symptom-button ${selectedSymptoms.includes(symptom) ? 'active' : ''}`}
                      onClick={() => toggleSymptom(symptom)}
                    >
                      {symptom}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          {selectedSymptoms.length > 0 && (
            <div className="selected-symptoms">
              <h3>Selected Symptoms</h3>
              <div className="symptom-intensity-list">
                {selectedSymptoms.map(symptom => (
                  <div key={symptom} className="symptom-intensity-item">
                    <span>{symptom}</span>
                    <div className="intensity-slider">
                      <label>Mild</label>
                      <input
                        type="range"
                        min="1"
                        max="5"
                        value={intensityValues[symptom] || 1}
                        onChange={(e) => handleIntensityChange(symptom, parseInt(e.target.value))}
                      />
                      <label>Severe</label>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <div className="symptom-notes">
            <h3>Notes</h3>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add any additional notes about how you're feeling..."
              rows="4"
            ></textarea>
          </div>
          
          <div className="form-actions">
            <button type="submit" className="save-button" disabled={selectedSymptoms.length === 0}>
              Save Symptoms
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Symptoms; 