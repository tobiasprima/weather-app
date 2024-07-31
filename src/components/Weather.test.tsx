/* eslint-disable testing-library/no-wait-for-multiple-assertions */
/* eslint-disable testing-library/no-unnecessary-act */
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { act } from "react";
import Weather from "./Weather";

const mock = new MockAdapter(axios);

const API_KEY = "test_api_key";

beforeAll(() => {
  process.env.REACT_APP_OPENWEATHER_API_KEY = API_KEY;
});

test("renders loading state initially", async () => {
  await act(async () => render(<Weather city="London" />));
  expect(screen.getByTestId("loader")).toBeInTheDocument();
});

test("renders weather data", async () => {
  // Mocking here don't need real API KEY
  mock
    .onGet(
      `https://api.openweathermap.org/data/2.5/weather?q=London&appid=${API_KEY}&units=metric`
    )
    .reply(200, {
      main: { temp: 20 },
      weather: [{ description: "Sunny", icon: "01d" }],
    });

  await act(async () => render(<Weather city="London" />));

  setTimeout(() => {
    // Give delay for the DOM to be rendered
    const cityText = screen.getByText("London");
    const tempText = screen.getByText("20°C");
    const descriptionText = screen.getByText("Sunny");
    const iconAltText = screen.getByText("Sunny");

    expect(cityText).toBeInTheDocument();
    expect(tempText).toBeInTheDocument();
    expect(descriptionText).toBeInTheDocument();
    expect(iconAltText).toBeInTheDocument();
  }, 1000);
});
test("renders error message on failure", async () => {
  // Mocking here don't need real API KEY
  mock
    .onGet(
      "https://api.openweathermap.org/data/2.5/weather?q=London&appid=API_KEY&units=metric"
    )
    .reply(500);

  await act(async () => render(<Weather city="London" />));

  expect(
    await screen.findByText(/failed to fetch weather data/i)
  ).toBeInTheDocument();
});
