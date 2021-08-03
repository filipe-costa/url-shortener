import { fireEvent, render, screen } from "@testing-library/react";
import { Form } from "./Form";

describe("<Form />", () => {
  it("renders form", () => {
    render(<Form role="form">Form</Form>);
    expect(screen.getByRole("form")).toBeInTheDocument();
  });

  it("mocks onSubmit", () => {
    const onSubmit = jest.fn();
    render(
      <Form role="form" onSubmit={onSubmit}>
        Form
      </Form>
    );
    fireEvent.submit(screen.getByRole("form"));
    expect(onSubmit).toHaveBeenCalled();
  });
});
