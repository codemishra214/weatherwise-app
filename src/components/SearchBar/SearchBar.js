import React, { useState } from 'react';
import { fetchGeocodingData } from '../../utils/api'; // We'll add this to api.js
import './SearchBar.css';

const SearchBar = ({ onSearch }) => {
  const [city, setCity] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    if (city.trim() === '') return;

    try {
      const response = await fetchGeocodingData(city);
      if (response.length > 0) {
        const { lat, lon, name } = response[0];
        onSearch(lat, lon, name);
      } else {
        alert('City not found. Please try again.');
      }
    } catch (error) {
      alert('Failed to fetch location data.');
    }
  };

  return (
    <form className="search-bar" onSubmit={handleSearch}>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city name..."
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchBar;