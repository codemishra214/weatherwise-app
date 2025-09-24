import React from 'react';
import './Header.css';

const Header = ({ activeTab, setActiveTab, navigate }) => {
  return (
    <header className="app-header">
      <div className="logo" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
        <h1>🌤️ WeatherWise</h1>
      </div>
      <nav className="navigation">
        <button
          className={`nav-link ${activeTab === 'home' ? 'active' : ''}`}
          onClick={() => setActiveTab('home')}
        >
          Home
        </button>
        <button
          className={`nav-link ${activeTab === 'forecast' ? 'active' : ''}`}
          onClick={() => setActiveTab('forecast')}
        >
          Forecast
        </button>
        <button
          className={`nav-link ${activeTab === 'map' ? 'active' : ''}`}
          onClick={() => setActiveTab('map')}
        >
          Map
        </button>
      </nav>
      <div className="settings">

      </div>
    </header>
  );
};

export default Header;