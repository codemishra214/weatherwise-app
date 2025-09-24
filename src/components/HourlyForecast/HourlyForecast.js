import React from 'react';
import './HourlyForecast.css';

const HourlyForecast = ({ forecastData }) => {
  const next24Hours = forecastData.list.slice(0, 8);

  const formatTime = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleTimeString('en-US', {
      hour: 'numeric',
      hour12: true,
    });
  };

  return (
    <div className="hourly-forecast-container">
      <h3 className="forecast-title">Hourly Forecast</h3>
      <div className="hourly-scroll">
        {next24Hours.map((item, index) => (
          <div className="hourly-card" key={index}>
            <p className="hourly-time">{formatTime(item.dt)}</p>
            <img
              src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
              alt={item.weather[0].description}
              className="hourly-icon"
            />
            <p className="hourly-temp">{Math.round(item.main.temp)}°C</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HourlyForecast;