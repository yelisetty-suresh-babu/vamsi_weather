import React from 'react';

const WeatherCard = ({city,newday,tempmaximum,tempminimum,description,iconic,unit}) => {
    const unitvamsi = unit === 'metric' ? '°C' : '°F';  
  return (
    <div className="weather-card">
      <h2>City : {city}</h2>
      <h2>{newday}</h2>
      <img src={`http://openweathermap.org/img/wn/${iconic}@2x.png`} alt="weather icon" />
      <h2><b>Max Temperature : </b>{tempmaximum} {unitvamsi}</h2>
      <h2><b>Min Temperature : </b>{tempminimum} {unitvamsi}</h2>
      <h2><b>Description : </b> {description}</h2>

    </div>
  );
};

export default WeatherCard;
