import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { WeatherData, WeatherProps, WeatherResponse } from "../types";

const API_KEY = process.env.REACT_APP_OPENWEATHER_API_KEY;

const WeatherContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f0f4f8;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Weather: React.FC<WeatherProps> = ({ city }) => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get<WeatherResponse>(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
        );
        const data = response.data;
        setWeather({
          temperature: data.main?.temp ?? 0,
          description: data.weather?.[0]?.description ?? "No Description",
          icon: `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`,
        });
        setLoading(false);
      } catch (e) {
        setError("Failed to fetch weather data");
        setLoading(false);
      }
    };

    fetchWeather();
  }, [city]);

  if (loading) {
    return <WeatherContainer>Loading ...</WeatherContainer>;
  }

  if (error) {
    return <WeatherContainer>{error}</WeatherContainer>;
  }

  return (
    <WeatherContainer>
      {weather ? (
        <>
          <h1 className="text-2xl font-bold">{city}</h1>
          <img src={weather.icon} alt={weather.description} />
          <p className="text-xl">{weather.temperature}°C</p>
          <p className="text-sm">{weather.description}</p>
        </>
      ) : (
        <p>No data</p>
      )}
    </WeatherContainer>
  );
};

export default Weather;
