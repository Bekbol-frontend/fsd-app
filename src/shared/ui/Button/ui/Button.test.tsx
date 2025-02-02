import { render, screen } from "@testing-library/react";
import Button from "./Button";

describe("Button", () => {
  test("test-1", () => {
    render(<Button>click</Button>);
    expect(screen.getByText("click")).toBeInTheDocument();
  });
});
