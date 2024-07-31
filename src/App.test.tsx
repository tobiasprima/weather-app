/* eslint-disable testing-library/no-unnecessary-act */
/* eslint-disable testing-library/no-wait-for-multiple-assertions */
import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { act } from "react";
import { setTimeout } from "timers";
import App from "./App";

const mock = new MockAdapter(axios);

const API_KEY = "test_api_key"; // Mock API key

beforeAll(() => {
  process.env.REACT_APP_OPENWEATHER_API_KEY = API_KEY;
});

test("renders loading state initially in App", async () => {
  await act(async () => render(<App />));
  expect(screen.getByTestId("loader")).toBeInTheDocument();
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

  await act(async () => render(<App />));
  setTimeout(() => {
    // Give delay for the DOM to be rendered
    expect(screen.getByText("London")).toBeInTheDocument();
    expect(screen.getByText("20°C")).toBeInTheDocument();
    expect(screen.getByText("Sunny")).toBeInTheDocument();
    expect(screen.getByAltText("Sunny")).toBeInTheDocument();
  }, 1000);
});

test("renders error modal in Weather on failure", async () => {
  mock
    .onGet(
      `https://api.openweathermap.org/data/2.5/weather?q=London&appid=${API_KEY}&units=metric`
    )
    .reply(500);

  await act(async () => render(<App />));

  await waitFor(() => {
    expect(
      screen.getByText(/failed to fetch weather data/i)
    ).toBeInTheDocument();
  });

  fireEvent.click(screen.getByText(/close/i));

  await waitFor(() => {
    expect(
      screen.queryByText(/failed to fetch weather data/i)
    ).not.toBeInTheDocument();
  });
});

test("allows the user to input a city and fetch weather data", async () => {
  mock
    .onGet(
      `https://api.openweathermap.org/data/2.5/weather?q=London&appid=${API_KEY}&units=metric`
    )
    .reply(200, {
      main: { temp: 20 },
      weather: [{ description: "Sunny", icon: "01d" }],
    });

  mock
    .onGet(
      `https://api.openweathermap.org/data/2.5/weather?q=Paris&appid=${API_KEY}&units=metric`
    )
    .reply(200, {
      main: { temp: 25 },
      weather: [{ description: "Clear", icon: "01d" }],
    });

  await act(async () => render(<App />));

  // Initially, it should load weather for London
  setTimeout(() => {
    expect(screen.getByText("London")).toBeInTheDocument();
    expect(screen.getByText("20°C")).toBeInTheDocument();
    expect(screen.getByText("Sunny")).toBeInTheDocument();
  }, 1000);

  // Change the city to Paris
  fireEvent.change(screen.getByPlaceholderText(/enter city name/i), {
    target: { value: "Paris" },
  });
  fireEvent.click(screen.getByText(/get weather/i));

  // Now it should load weather for Paris
  setTimeout(() => {
    expect(screen.getByText("Paris")).toBeInTheDocument();
    expect(screen.getByText("25°C")).toBeInTheDocument();
    expect(screen.getByText("Clear")).toBeInTheDocument();
  }, 1000);
});
