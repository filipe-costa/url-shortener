import { fireEvent, render, screen } from "@testing-library/react";
import { Button } from "./Button";

describe("<Button />", () => {
  it("renders button", () => {
    render(<Button>Button</Button>);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("mocks onClick", () => {
    const onClick = jest.fn();
    render(<Button onClick={onClick}>Button</Button>);
    fireEvent.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalled();
  });
});
