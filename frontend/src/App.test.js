import { render, screen } from "@testing-library/react";
import App from "./App";

test("Home page title exists", () => {
    render(<App />);
    const pageTitle = screen.getByText(/Our team/i);
    expect(pageTitle).toBeInTheDocument();
});
