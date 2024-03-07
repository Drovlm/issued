import { useState, useEffect } from "react";
import './App.css';

function AAA() {
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedState, setSelectedState] = useState('');

  useEffect(() => {
    fetchStates();
  }, []);

  useEffect(() => {
    if (selectedState !== '') {
      fetchCities(selectedState);
    }
  }, [selectedState]);

  const fetchStates = () => {
    fetch('http://localhost:3000/project/src/Inst.php')
      .then(res => res.json())
      .then(result => {
        setStates(result);
      })
      .catch(error => {
        console.error('Error fetching states:', error);
      });
  };

  const fetchCities = (state) => {
    fetch(`http://localhost:3000/project/src/Specialist.php?state=${state}`)
      .then(res => res.json())
      .then(result => {
        setCities(result); // setting cities as an array
      })
      .catch(error => {
        console.error('Error fetching cities:', error);
      });
  };

  return (
    <div>
      CASCADING DROPDOWNS:
      <select onChange={(e) => { setSelectedState(e.target.value); }}>
        <option value="">Select a State</option>
        {states.map((state, index) => (
          <option key={index} value={state}>{state}</option>
        ))}
      </select>

      {selectedState && (
        <select>
          <option value="">Select a City</option>
          {cities.map((city, index) => ( // iterating over cities as an array
            <option key={index} value={city}>{city}</option>
          ))}
        </select>
      )}
    </div>
  );
}

export default AAA;