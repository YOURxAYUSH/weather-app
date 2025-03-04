'use client';
import { useState } from "react";
import axios from "axios";

const WeatherApp = () => {
  const [city, setCity] = useState(""); // For user input
  const [weather, setWeather] = useState(null); // To store fetched weather data
  const [error, setError] = useState(null); // For error handling

  const fetchWeather = async () => {
    try {
      const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY; // Load API key from environment variables

      // Debugging API key
      console.log("API Key:", apiKey);

      if (!apiKey) {
        setError("API Key is not configured. Please check your setup.");
        return;
      }

      // API URL for weather data
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
        city.trim()
      )}&units=metric&appid=${apiKey}`;

      // Debugging API URL
      console.log("API URL:", apiUrl);

      // Make API request
      const response = await axios.get(apiUrl);

      // Debugging API response
      console.log("Weather Data:", response.data);

      setWeather(response.data); // Update weather state with fetched data
      setError(null); // Clear any existing error
    } catch (err) {
      // Log the error details
      console.error("API Request Error:", err.response || err.message || err);

      if (err.response?.status === 401) {
        setError("Invalid API key. Please check your configuration.");
      } else if (err.response?.status === 404) {
        setError("City not found. Please check the spelling.");
      } else {
        setError("Unable to fetch weather data. Please try again later.");
      }

      setWeather(null); // Clear weather data on error
    }
  };

  return (
      <div className="p-6 max-w-md mx-auto bg-gray-100 rounded-lg" >
         <video
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-full h-full object-cover -z-10"
      >
        <source src="/background.mp4" type="video/mp4" />
        
      </video>
      <h1 className="text-xl font-bold text-center">Weather App</h1>
      <div className="my-4">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="p-2 border rounded w-full"
        />
        <button
          onClick={fetchWeather}
          className="mt-2 p-2 bg-blue-500 text-white rounded w-full"
        >
          Get Weather
        </button>
      </div>
      {error && <p className="text-red-500">{error}</p>}
      {weather && (
        <div className="mt-4 p-4 bg-white rounded shadow">
          <h2 className="text-lg font-bold">{weather.name}</h2>
          <p>{weather.weather[0].description}</p>
          <p>Temperature: {weather.main.temp}°C</p>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Wind Speed: {weather.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
};

export default WeatherApp;


