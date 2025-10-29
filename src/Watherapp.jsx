import "./App.css";
import axios from "axios";
import { useState } from "react";

function Watherapp() {
  const [Description, setDescription] = useState("");
  const [Place, setPlace] = useState("");
  const [Heat, setHeat] = useState("");
  const [Wind, setWind] = useState("");
  const [Direction, setDirection] = useState("");
  const [HAlat, setHAlat] = useState("");
  const [Apikey] = useState("8b166f673cee1210e7f90905df53451c");
  const [error, setError] = useState("");

  const getData = () => {
    if (!Place.trim()) {
      setError("Please enter a city name!");
      return;
    }
    setError("");
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${Place}&appid=${Apikey}&units=metric`
      )
      .then((response) => {
        setHeat(response.data.main.temp);
        setHAlat(response.data.weather[0].icon);
        setDescription(response.data.weather[0].description);
        setWind(response.data.wind.speed);
        setDirection(response.data.wind.deg);
        setError("");
      })
      .catch(() => {
        setError("City not found. Please enter a valid place name!");
      });
  };

  return (
    <div className="weather-app">
      <h1 className="app-title">🌦️ Weather Forecast</h1>
      <div className="input-section">
        <input
          type="text"
          value={Place}
          onChange={(e) => setPlace(e.target.value)}
          placeholder="Enter city name..."
        />
        <button onClick={getData}>Get</button>
      </div>

      {error && <p className="error-msg">{error}</p>}

      {Description && (
        <div className="weather-card fade-in">
          <img
            src={`https://openweathermap.org/img/wn/${HAlat}@2x.png`}
            alt="Weather icon"
            className="weather-icon"
          />
          <h2 className="city-name">{Place.toUpperCase()}</h2>
          <p className="temp">{Heat}°C</p>
          <p className="desc">{Description}</p>
          <div className="extra-info">
            <p>💨 Wind: {Wind} km/h</p>
            <p>🧭 Direction: {Direction}°</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Watherapp;
