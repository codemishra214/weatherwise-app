const API_KEY = '27d9e875732a8ea9ad20d3028cdacb97'; // this is my api

const removeDiacritics = (str) => {
  if (!str) return '';
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
};

export const fetchWeatherData = async (lat, lon, searchedCityName) => {
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

  
  return {
    current: currentWeatherData,
    forecast: forecastData,
    name: normalizedDisplayName
  };
};


export const fetchGeocodingData = async (city) => {
  const response = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`);
  return response.json();
}