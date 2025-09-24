import React, { useState } from 'react';
import './SearchBar.css';

const SearchBar = ({ onSearch, apiKey }) => {
  const [city, setCity] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    if (city.trim() === '') return;

    try {
      const response = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`);
      const data = await response.json();
      if (data.length > 0) {
        const { lat, lon } = data[0];
        onSearch(lat, lon, city);
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