import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render, screen } from "@testing-library/react";
import Modal from "./Modal";

const mockOnClose = jest.fn();

test("renders Modal component with message", () => {
  render(<Modal message="Test Error" onClose={mockOnClose} />);
  expect(screen.getByText("Test Error")).toBeInTheDocument();
  expect(screen.getByText("Close")).toBeInTheDocument();
});

test("calls onClose when Close button is clicked", () => {
  render(<Modal message="Test Error" onClose={mockOnClose} />);
  fireEvent.click(screen.getByText("Close"));
  expect(mockOnClose).toHaveBeenCalledTimes(1);
});
