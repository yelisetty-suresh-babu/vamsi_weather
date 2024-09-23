import React from 'react';
import './App.css'
const ForecastCard = ({ day, tempMax, tempMin, icon,desc,unit }) => {
  const temperatureUnit = unit === 'metric' ? '°C' : '°F';

  return (
    <div className="forecast-card">
      <h3>{day}</h3>
      <img src={`http://openweathermap.org/img/wn/${icon}@2x.png`} alt="weather icon" />
      <p><b>Max Temperature : </b>{tempMax} {temperatureUnit}</p>
      <p><b>Min Temperature : </b>{tempMin} {temperatureUnit}</p>
      <p><b>Description : </b> {desc}</p>
    </div>
  );
};

export default ForecastCard;
