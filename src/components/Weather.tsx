import React from "react";
import styled from "styled-components";

interface WeatherProps {
  city: string;
}

interface WeatherData {
  temperature: number;
  description: string;
  icon: string;
}

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
  return <div>Weather</div>;
};

export default Weather;
