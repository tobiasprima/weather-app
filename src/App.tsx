import React, { useState } from "react";
import styled from "styled-components";
import Weather from "./components/Weather";

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #e0f7fa;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
`;

const Input = styled.input`
  padding: 10px;
  margin: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #00796b;
  color: white;
  cursor: pointer;

  &:hover {
    background-color: #004d40;
  }
`;

const App: React.FC = () => {
  const [city, setCity] = useState("Taipei");
  const [inputCity, setInputCity] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (inputCity.trim() !== "") {
      setCity(inputCity);
    }
  };

  return (
    <AppContainer>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Enter city name"
          value={inputCity}
          onChange={(e) => setInputCity(e.target.value)}
        />
        <Button type="submit">Get Weather</Button>
      </Form>
      <Weather city={city} />
    </AppContainer>
  );
};

export default App;
