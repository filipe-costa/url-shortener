import { render, screen } from "@testing-library/react";
import { Typography } from "./Typography";

describe("<Typography />", () => {
  it("renders h1 tag", () => {
    render(<Typography as="h1">h1</Typography>);
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
  });

  it("renders h2 tag", () => {
    render(<Typography as="h2">h2</Typography>);
    expect(screen.getByRole("heading", { level: 2 })).toBeInTheDocument();
  });

  it("renders h3 tag", () => {
    render(<Typography as="h3">h3</Typography>);
    expect(screen.getByRole("heading", { level: 3 })).toBeInTheDocument();
  });

  it("renders h4 tag", () => {
    render(<Typography as="h4">h4</Typography>);
    expect(screen.getByRole("heading", { level: 4 })).toBeInTheDocument();
  });

  it("renders h5 tag", () => {
    render(<Typography as="h5">h5</Typography>);
    expect(screen.getByRole("heading", { level: 5 })).toBeInTheDocument();
  });

  it("renders h6 tag", () => {
    render(<Typography as="h6">h6</Typography>);
    expect(screen.getByRole("heading", { level: 6 })).toBeInTheDocument();
  });

  it("renders span tag", () => {
    render(
      <Typography as="span" role="text">
        span
      </Typography>
    );
    expect(screen.getByRole("text")).toBeInTheDocument();
  });

  it("renders p tag", () => {
    render(
      <Typography as="p" role="paragraph">
        p
      </Typography>
    );
    expect(screen.getByRole("paragraph")).toBeInTheDocument();
  });

  it("renders default tag (span) when no prop is provided", () => {
    render(<Typography role="text">span</Typography>);
    expect(screen.getByRole("text")).toBeInTheDocument();
  });

  it("fails to render with unknown tag", () => {
    expect(() => render(<Typography as="bla" />)).toThrowError();
  });
});
