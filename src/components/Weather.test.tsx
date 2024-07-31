import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import Weather from "./Weather";

const mock = new MockAdapter(axios);

test("renders loading state initially", () => {
  render(<Weather city="London" />);
  expect(screen.getByText(/loading/i)).toBeInTheDocument();
});

test("renders weather data", async () => {
  mock
    .onGet(
      "https://api.openweathermap.org/data/2.5/weather?q=London&appid=YOUR_API_KEY&units=metric"
    )
    .reply(200, {
      main: { temp: 20 },
      weather: [{ description: "Sunny", icon: "01d" }],
    });

  render(<Weather city="London" />);

  expect(await screen.findByText(/20°C/i)).toBeInTheDocument();
  expect(await screen.findByText(/Sunny/i)).toBeInTheDocument();
});

test("renders error message on failure", async () => {
  mock
    .onGet(
      "https://api.openweathermap.org/data/2.5/weather?q=London&appid=YOUR_API_KEY&units=metric"
    )
    .reply(500);

  render(<Weather city="London" />);

  expect(
    await screen.findByText(/failed to fetch weather data/i)
  ).toBeInTheDocument();
});
