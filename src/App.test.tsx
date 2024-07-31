import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import App from "./App";

const mock = new MockAdapter(axios);

const API_KEY = "test_api_key"; // Mock API key

beforeAll(() => {
  process.env.REACT_APP_OPENWEATHER_API_KEY = API_KEY;
});

test("renders loading state initially in App", () => {
  render(<App />);
  expect(screen.getByText(/loading/i)).toBeInTheDocument();
});

test("renders weather data in App", async () => {
  mock
    .onGet(
      `https://api.openweathermap.org/data/2.5/weather?q=London&appid=${API_KEY}&units=metric`
    )
    .reply(200, {
      main: { temp: 20 },
      weather: [{ description: "Sunny", icon: "01d" }],
    });

  render(<App />);

  expect(await screen.findByText(/20°C/i)).toBeInTheDocument();
  expect(await screen.findByText(/Sunny/i)).toBeInTheDocument();
});

test("renders error message in App on failure", async () => {
  mock
    .onGet(
      `https://api.openweathermap.org/data/2.5/weather?q=London&appid=${API_KEY}&units=metric`
    )
    .reply(500);

  render(<App />);

  expect(
    await screen.findByText(/failed to fetch weather data/i)
  ).toBeInTheDocument();
});
