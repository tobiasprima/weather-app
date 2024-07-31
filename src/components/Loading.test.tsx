import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import Loading from "./Loading";

test("renders Loading component", () => {
  render(<Loading />);
  expect(screen.getByTestId("loader")).toBeInTheDocument();
});
