import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './ForecastGraph.css';

const ForecastGraph = ({ forecastData }) => {
  // This function processes the 3-hour forecast data into daily highs and lows
  const processForecastData = (list) => {
    const dailyData = {};

    list.forEach(item => {
      const date = item.dt_txt.split(' ')[0];
      if (!dailyData[date]) {
        dailyData[date] = {
          temps: [],
          lows: [],
          highs: [],
        };
      }
      dailyData[date].temps.push(item.main.temp);
      dailyData[date].lows.push(item.main.temp_min);
      dailyData[date].highs.push(item.main.temp_max);
    });

    return Object.keys(dailyData).slice(0, 5).map(date => {
      const dayInfo = dailyData[date];
      return {
        name: new Date(date).toLocaleDateString('en-US', { weekday: 'short' }),
        High: Math.round(Math.max(...dayInfo.highs)),
        Low: Math.round(Math.min(...dayInfo.lows)),
      };
    });
  };

  const formattedData = processForecastData(forecastData.list);

  return (
    <div className="forecast-graph">
      <h3>5-Day Forecast</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={formattedData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis unit="°C" />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="High" stroke="#e74c3c" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="Low" stroke="#3498db" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ForecastGraph;