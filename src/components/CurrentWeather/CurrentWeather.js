import React from 'react';
import './CurrentWeather.css';

const formatTime = (timestamp) => {
  return new Date(timestamp * 1000).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });
};

const CurrentWeather = ({ data }) => {
  if (!data || !data.current) return null;

  const { name, current } = data;
  const iconUrl = `https://openweathermap.org/img/wn/${current.weather[0].icon}@4x.png`;

  const currentTime = new Date(current.dt * 1000).toLocaleString('en-US', {
    weekday: 'long',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });

  return (
    <div className="weather-card">
      <div className="card-header">
        <div>
          <h2 className="city-name">{name}</h2>
          <p className="date-time">Updated: {currentTime}</p>
        </div>
      </div>
      <div className="card-body">
        <div className="temperature-container">
          <img src={iconUrl} alt={current.weather[0].description} className="weather-icon" />
          <p className="temperature">{Math.round(current.main.temp)}°C</p>
        </div>
        <div className="condition-container">
          <p className="weather-description">{current.weather[0].description}</p>
          <p className="high-low">
            High: {Math.round(current.main.temp_max)}°C / Low: {Math.round(current.main.temp_min)}°C
          </p>
        </div>
      </div>
      <div className="card-footer">
        <div className="detail-item">
          🌡️ Feels Like
          <span>{Math.round(current.main.feels_like)}°C</span>
        </div>
        <div className="detail-item">
          💧 Humidity
          <span>{current.main.humidity}%</span>
        </div>
        <div className="detail-item">
          🌬️ Wind Speed
          <span>{current.wind.speed} m/s</span>
        </div>
        <div className="detail-item">
          📊 Pressure
          <span>{current.main.pressure} hPa</span>
        </div>
        <div className="detail-item">
          🌅 Sunrise
          <span>{formatTime(current.sys.sunrise)}</span>
        </div>
        <div className="detail-item">
          🌇 Sunset
          <span>{formatTime(current.sys.sunset)}</span>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;