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
import './DashboardPage.css';

const removeDiacritics = (str) => {
  if (!str) return '';
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
};

const DashboardPage = () => {
  const API_KEY = '27d9e875732a8ea9ad20d3028cdacb97';

  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('home');
  const [searchedCityName, setSearchedCityName] = useState('');

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


  const fetchWeatherData = async (lat, lon) => {
    setLoading(true);
    setError(null);
    try {
      await new Promise(res => setTimeout(res, 500));
      const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
      const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
      const [currentWeatherResponse, forecastResponse] = await Promise.all([
        fetch(currentWeatherUrl),
        fetch(forecastUrl),
      ]);
      if (!currentWeatherResponse.ok || !forecastResponse.ok) {
        throw new Error('Weather data not found. Please check the city name or try again.');
      }
      const currentWeatherData = await currentWeatherResponse.json();
      const forecastData = await forecastResponse.json();
      const displayName = searchedCityName || currentWeatherData.name;
      const normalizedDisplayName = removeDiacritics(displayName);
      setWeatherData({ current: currentWeatherData, forecast: forecastData, name: normalizedDisplayName });
      setSearchedCityName('');
      setActiveTab('home');
    } catch (err) {
      setError(err.message);
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (lat, lon, name) => {
    const formattedName = name.charAt(0).toUpperCase() + name.slice(1);
    setSearchedCityName(formattedName);
    fetchWeatherData(lat, lon);
  };

  const handleGetCurrentLocation = () => {
    setSearchedCityName('');
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchWeatherData(position.coords.latitude, position.coords.longitude);
        },
        () => {
          setError('Unable to retrieve your location. Please allow location access.');
          setLoading(false);
        }
      );
    } else {
      setError('Geolocation is not supported by your browser.');
      setLoading(false);
    }
  };
  
  const handleMapClick = (lat, lon, name) => {
    setSearchedCityName(name || ''); 
    fetchWeatherData(lat, lon);
  };
  
  const renderContent = () => {
    if (activeTab === 'map') {
      return <WeatherMap onMapClick={handleMapClick} initialPosition={weatherData ? [weatherData.current.coord.lat, weatherData.current.coord.lon] : null} />;
    }
    if (loading) return null;
    if (error) {
      return <div className="message error">{error}</div>;
    }
    if (!weatherData) {
      return (
        <div className="search-prompt">
          <img src="/weather-illustration.svg" alt="Weather illustration" style={{width: '200px', marginBottom: '20px'}}/>
          <h3>Welcome to WeatherWise!</h3>
          <p>Search for a city to get started.</p>
          <SearchBar onSearch={handleSearch} apiKey={API_KEY} />
        </div>
      );
    }
    switch (activeTab) {
      case 'home':
        return <CurrentWeather data={{ current: weatherData.current, name: weatherData.name }} />;
      case 'forecast':
        return (
          <div>
            <HourlyForecast forecastData={weatherData.forecast} />
            <DailyForecast forecastData={weatherData.forecast} />
          </div>
        );
      default:
        return <CurrentWeather data={{ current: weatherData.current, name: weatherData.name }} />;
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