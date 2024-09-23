import React, { useState, useEffect } from 'react';
import axios from 'axios';
import WeatherCard from './WeatherCard';
import ForecastCard from './ForecastCard';
import CitySearch from './CitySearch';
import './App.css'
const API_KEY = '6fc216cc3b1c56216ebb8cc1054d7b08'; 
const App = () => {
  const [city, setCity] = useState('New York');
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState([]);
  const [unit, setUnit] = useState('metric'); 
  const [error, setError] = useState(null );

  useEffect(() => {
    fetchWeather(city);
  }, [city, unit]);

  const fetchWeather = async (city) => {
    try {
      const weatherResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${API_KEY}`
      );
      const forecastResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${unit}&appid=${API_KEY}`
      );

      setWeatherData(weatherResponse.data);
      setForecastData(processForecastData(forecastResponse.data.list));
      setError(null);
    } catch (error){
      setError('City not found. Please try again.');
      setWeatherData(null);
      setForecastData([]);
    }
  };

  const processForecastData = (data) => {
    let dailyData = data.filter((reading) => reading.dt_txt.includes("18:00:00"));
    return dailyData;
  };

  const toggleUnit = () => {
    setUnit(unit === 'metric' ? 'imperial' : 'metric');
  };

  return (
    <div className="App">
      <h1>Weather Forecast</h1>
      <CitySearch setCity={setCity} />
      <button onClick={toggleUnit}>
        Switch to {unit === 'metric' ? 'Fahrenheit' : 'Celsius'}
      </button>
      {error && <p className="error">{error}</p>}
      {weatherData && (
        <WeatherCard
        city ={weatherData.name}
        newday ={new Date((weatherData.dt + weatherData.timezone) * 1000).toLocaleDateString('en-US', { weekday: 'long' })}
        tempmaximum = {weatherData.main.temp_max}
        tempminimum = {weatherData.main.temp_min}
        description = {weatherData.weather[0].description}
        iconic={weatherData.weather[0].icon}
        unit={unit}
        />
      )}
      <div className="forecast">
        {forecastData.map((day, index) => (
          <ForecastCard          
            key={index}
            day={new Date(day.dt * 1000).toLocaleDateString('en-US', { weekday: 'long' })}
            tempMax={day.main.temp_max}
            tempMin={day.main.temp_min}
            icon={day.weather[0].icon}
            desc = {day.weather[0].description}
            unit={unit}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
