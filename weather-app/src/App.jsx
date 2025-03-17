import { useState } from "react";
import axios from "axios";
import "./App.css";

const API_KEY = "2d06b77d235ec333d71c894d66c98cfe"; // Replace with your API key

const App = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const fetchWeather = async () => {
    try {
      setError("");
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      setWeather(response.data);
    } catch (err) {
      setError("City not found. Please try again!");
      setWeather(null);
    }
  };

  return (
    <div className="container">
      <div className="background-animation"></div>
      <h1 className="title">🌤 Weather App</h1>
      <div className="search-box">
        <input
          type="text"
          className="input-field"
          placeholder="Enter city..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button className="search-btn" onClick={fetchWeather}>🔍 Search</button>
      </div>

      {error && <p className="error">{error}</p>}

      {weather && (
        <div className="weather-card">
          <h2>
            {weather.name}, {weather.sys.country}
          </h2>
          <img
            src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt="weather-icon"
            className="weather-icon"
          />
          <h3>{weather.weather[0].description}</h3>
          <p>🌡 Temperature: {weather.main.temp}°C</p>
          <p>💧 Humidity: {weather.main.humidity}%</p>
          <p>🌬 Wind Speed: {weather.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
};

export default App;
