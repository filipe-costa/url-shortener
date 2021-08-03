import React, { FC, useState, useReducer, FormEvent, ChangeEvent, Dispatch, ReducerAction } from "react";

import { Typography } from "../Typography/Typography";
import {
  Form,
  FieldGroup,
  FieldInput,
  FieldMessage,
  FieldLabel,
  Button,
} from "../Form";

export type OnSubmitType = {
  url: string
  dispatch: Dispatch<ReducerAction<any>>
}

type UrlShortenerFormProps = {
  onSubmit: ({url, dispatch}: OnSubmitType) => void;
};

type InitialStateType = {
  url: string;
  successMessage: string | null;
  errorMessage: string | null;
};

const initialState = {
  successMessage: "",
  errorMessage: "",
  url: "",
};

const reducer = (state: InitialStateType, action: any) => {
  switch (action.type) {
    case "event/setUrlText":
      return { ...state, url: action.payload };
    case "event/setErrorMessage":
      return { ...state, errorMessage: action.payload, successMessage: null };
    case "event/setSuccessMessage":
      return { ...state, successMessage: action.payload, errorMessage: null };
    default:
      return state;
  }
};

export const UrlShortenerForm: FC<UrlShortenerFormProps> = ({
  onSubmit
}) => {
  const [copied, setCopied] = useState<boolean>(false);
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const url = state.url
    if(!url) {
      return
    }
    setCopied(false)
    dispatch({ type: "event/setErrorMessage", payload: null });
    dispatch({ type: "event/setSuccessMessage", payload: null });
    onSubmit({url, dispatch})
  }

  const handleCopy = () => {
    navigator.clipboard
      .writeText(state.successMessage!)
      .then(() => {
        setCopied(true);
      })
      .catch(() => {
        setCopied(false);
      });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    dispatch({ type: "event/setErrorMessage", payload: null });
    dispatch({ type: "event/setSuccessMessage", payload: null });
    dispatch({ type: "event/setUrlText", payload: value });
  };

  return (
    <>
      <Typography as="h1">url shortener</Typography>
      <Form role="form" onSubmit={handleSubmit} className="space-y-3">
        <FieldGroup>
          <FieldLabel htmlFor="url" className="space-y-1">
            <FieldInput
              placeholder="https://"
              name="url"
              data-testid="url-input"
              aria-label="url-input"
              onChange={handleChange}
              value={state.url}
            />
            {state.errorMessage?.length > 0 && (
              <FieldMessage variant="error" data-testid="error-message">{state.errorMessage}</FieldMessage>
            )}
            {state.successMessage?.length > 0 && (
              <div className="flex flex-1">
                <FieldMessage className="flex-1" variant="success" data-testid="error-message">
                  {state.successMessage}
                </FieldMessage>
                <Button type="button" onClick={handleCopy}>
                  {copied ? "Copied" : "Copy"}
                </Button>
              </div>
            )}
          </FieldLabel>
        </FieldGroup>
        <div className="flex flex-row justify-end">
          <Button type="submit">Shorten</Button>
        </div>
      </Form>
    </>
  );
};
