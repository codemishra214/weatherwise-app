import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../layout/Header';
import CurrentWeather from '../components/CurrentWeather/CurrentWeather';
import HourlyForecast from '../components/HourlyForecast/HourlyForecast';
import DailyForecast from '../components/DailyForecast/DailyForecast';
import WeatherMap from '../components/WeatherMap/WeatherMap';
import SearchBar from '../components/SearchBar/SearchBar';
import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner';
import { getWeatherBackground } from '../utils/getWeatherBackground';
import { fetchWeatherData as fetchWeather } from '../utils/api'; // Import our new function
import './DashboardPage.css';

const DashboardPage = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('home');

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const method = params.get('method');
    if (method === 'location') {
      handleGetCurrentLocation();
    } else if (method === 'map') {
      setActiveTab('map');
    }
  }, []);

  useEffect(() => {
    const backgroundClass = getWeatherBackground(weatherData);
    document.querySelector('.App').className = `App ${backgroundClass}`;
  }, [weatherData]);

  const handleFetch = async (lat, lon, name = '') => {
    setLoading(true);
    setError(null);
    try {
      const formattedName = name ? name.charAt(0).toUpperCase() + name.slice(1) : '';
      const data = await fetchWeather(lat, lon, formattedName);
      setWeatherData(data);
      setActiveTab('home');
    } catch (err) {
      setError(err.message);
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleGetCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => handleFetch(position.coords.latitude, position.coords.longitude),
        () => setError('Unable to retrieve your location. Please allow location access.')
      );
    } else {
      setError('Geolocation is not supported by your browser.');
    }
  };

  const renderContent = () => {
    if (activeTab === 'map') {
      return <WeatherMap onMapClick={handleFetch} initialPosition={weatherData ? [weatherData.current.coord.lat, weatherData.current.coord.lon] : null} />;
    }
    if (error) {
      return <div className="message error">{error}</div>;
    }
    if (!weatherData) {
      return (
        <div className="search-prompt">
          <img src="/weather-illustration.svg" alt="Weather illustration" style={{width: '200px', marginBottom: '20px'}}/>
          <h3>Welcome to WeatherWise!</h3>
          <p>Search for a city to get started.</p>
          <SearchBar onSearch={handleFetch} />
        </div>
      );
    }
    switch (activeTab) {
      case 'home':
        return <CurrentWeather data={weatherData} />;
      case 'forecast':
        return (
          <div>
            <HourlyForecast forecastData={weatherData.forecast} />
            <DailyForecast forecastData={weatherData.forecast} />
          </div>
        );
      default:
        return <CurrentWeather data={weatherData} />;
    }
  };

  return (
    <div>
      {loading && <LoadingSpinner />}
      <Header activeTab={activeTab} setActiveTab={setActiveTab} navigate={navigate} />
      <main className="dashboard-main">
        {renderContent()}
      </main>
    </div>
  );
};

export default DashboardPage;