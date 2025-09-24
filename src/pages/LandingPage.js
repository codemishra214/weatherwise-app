import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleSelection = (method) => {
    navigate(`/weather?method=${method}`);
  };

  return (
    <div className="landing-container">
      <div className="landing-card">
        <h1>WeatherWise</h1>
        <p>Your personal weather dashboard</p>
        <div className="options-container">
          <button onClick={() => handleSelection('search')}>
            🔍 Search by City Name
          </button>
          <button onClick={() => handleSelection('location')}>
            📍 Use My Current Location
          </button>
          <button onClick={() => handleSelection('map')}>
            🌍 Find on Map
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;