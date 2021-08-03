import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { UrlShortenerForm } from "./UrlShortenerForm";
import userEvent from '@testing-library/user-event'

describe("<UrlShortenerForm />", () => {
  it("renders with initial state", () => {
    const onSubmit = jest.fn()
    render(<UrlShortenerForm onSubmit={onSubmit} />)
    expect(screen.getByLabelText("url-input").value).toBe("")
  })

  it("fills up input field", () => {
    const onSubmit = jest.fn()
    render(<UrlShortenerForm onSubmit={onSubmit} />)
    userEvent.type(screen.getByLabelText("url-input"), "https://www.google.com/")
    expect(screen.getByLabelText("url-input").value).toBe("https://www.google.com/")
  })

  it("displays error message", () => {
    const onSubmit = jest.fn(({url, dispatch}) => {
      dispatch({ type: "event/setErrorMessage", payload: new Error("Something went wrong!") });
    })
    render(<UrlShortenerForm onSubmit={onSubmit} />)
    userEvent.type(screen.getByLabelText("url-input"), "https://www.google.com/")
    fireEvent.submit(screen.getByRole("form"))
    waitFor(() => {
      expect(screen.getByTestId("error-message")).toHaveTextContent("Something went wrong!")
    })
  })

  it("displays url message", () => {
    const onSubmit = jest.fn(({url, dispatch}) => {
      dispatch({ type: "event/setSuccessMessage", payload: "https://www.google.com/" });
    })
    render(<UrlShortenerForm onSubmit={onSubmit} />)
    userEvent.type(screen.getByLabelText("url-input"), "https://www.google.com/")
    fireEvent.submit(screen.getByRole("form"))
    waitFor(() => {
      expect(screen.getByTestId("success-message")).toHaveTextContent("https://www.google.com/")
    })
  })
})