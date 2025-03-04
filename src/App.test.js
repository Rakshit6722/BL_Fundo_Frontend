import { render } from "@testing-library/react";
import App from "./App";

jest.mock('react-router-dom');

test('renders App', () => {
  render(<App />);
});