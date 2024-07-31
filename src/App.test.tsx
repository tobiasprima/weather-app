/* eslint-disable testing-library/no-unnecessary-act */
/* eslint-disable testing-library/no-wait-for-multiple-assertions */
import "@testing-library/jest-dom/extend-expect";
import { render, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { act } from "react";
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

  await act(async () => render(<App />));
  setTimeout(() => {
    // Give delay for the DOM to be rendered
    expect(screen.getByText("London")).toBeInTheDocument();
    expect(screen.getByText("20°C")).toBeInTheDocument();
    expect(screen.getByText("Sunny")).toBeInTheDocument();
    expect(screen.getByAltText("Sunny")).toBeInTheDocument();
  }, 1000);
});

test("renders error message in App on failure", async () => {
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
});
