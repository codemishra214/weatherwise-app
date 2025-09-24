import React from 'react';
import './DailyForecast.css';

const DailyForecast = ({ forecastData }) => {
  // This function processes the 3-hour forecast data into daily highs and lows
  const processForecastData = (list) => {
    const dailyData = {};

    list.forEach(item => {
      const date = item.dt_txt.split(' ')[0];
      if (!dailyData[date]) {
        dailyData[date] = {
          temps: [],
          icons: [],
        };
      }
      dailyData[date].temps.push(item.main.temp);
      dailyData[date].icons.push(item.weather[0].icon);
    });

    return Object.keys(dailyData).slice(0, 5).map(date => {
      const dayInfo = dailyData[date];
      // Use the icon from midday (around 12:00-15:00) for a representative icon
      const representativeIcon = dayInfo.icons[Math.floor(dayInfo.icons.length / 2)];
      return {
        name: new Date(date).toLocaleDateString('en-US', { weekday: 'short' }),
        icon: representativeIcon,
        high: Math.round(Math.max(...dayInfo.temps)),
        low: Math.round(Math.min(...dayInfo.temps)),
      };
    });
  };
  
  const formattedData = processForecastData(forecastData.list);

  return (
    <div className="daily-forecast-container">
      <h3 className="forecast-title">5-Day Forecast</h3>
      <div className="daily-grid">
        {formattedData.map((day, index) => (
          <div className="daily-card" key={index}>
            <p className="day-name">{day.name}</p>
            <img 
              src={`https://openweathermap.org/img/wn/${day.icon}@2x.png`} 
              alt="weather icon"
              className="daily-icon"
            />
            <div className="daily-temps">
              <span className="high-temp">{day.high}°</span>
              <span className="low-temp">{day.low}°</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DailyForecast;