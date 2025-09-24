export const getWeatherBackground = (weatherData) => {
  if (!weatherData) return 'bg-default';

  const icon = weatherData.current.weather[0].icon;
  const isDay = icon.endsWith('d');

  if (!isDay) return 'bg-night';

  const mainCondition = weatherData.current.weather[0].main;

  switch (mainCondition) {
    case 'Clear':
      return 'bg-sunny';
    case 'Clouds':
      return 'bg-cloudy';
    case 'Rain':
    case 'Drizzle':
    case 'Thunderstorm':
      return 'bg-rainy';
    case 'Snow':
      return 'bg-snowy';
    case 'Mist':
    case 'Smoke':
    case 'Haze':
    case 'Dust':
    case 'Fog':
    case 'Sand':
    case 'Ash':
    case 'Squall':
    case 'Tornado':
      return 'bg-misty';
    default:
      return 'bg-default';
  }
};