/* eslint-disable testing-library/no-unnecessary-act */
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import { act } from "react";
import Loading from "./Loading";

test("renders Loading component", async () => {
  await act(async () => render(<Loading />));
  expect(screen.getByTestId("loader")).toBeInTheDocument();
});
