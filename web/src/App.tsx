import React, { ChangeEvent, FormEvent, useState, useReducer} from 'react';

import { Container } from './components/Container/Container';
import { Typography } from './components/Typography/Typography';
import { Form, FieldGroup, FieldInput, FieldMessage, FieldLabel, Button } from './components/Form';
import { URLService } from './services/url';

type InitialStateType = {
  url: string
  successMessage: string | null
  errorMessage: string | null
}

const initialState = {
  successMessage: "",
  errorMessage: "",
  url: ""
}

const reducer = (state: InitialStateType, action: any) => {
  switch(action.type) {
    case "event/setUrlText":
      return {...state, url: action.payload}
    case "event/setErrorMessage":
      return {...state, errorMessage: action.payload, successMessage: null}
    case "event/setSuccessMessage":
      return {...state, successMessage: action.payload, errorMessage: null}
    default:
      return state
  }
}

export const App = () => {
  const [copied, setCopied] = useState<boolean>(false)
  const [state, dispatch] = useReducer(reducer, initialState)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if(!state.url) {
      return
    }
    dispatch({type: "event/setErrorMessage", payload: null})
    dispatch({type: "event/setSuccessMessage", payload: null})
    URLService.generate({url: state.url})
      .then((res) => {
        dispatch({type: "event/setSuccessMessage", payload: res.data.url})
      })
      .catch((err) => {
        dispatch({type: "event/setErrorMessage", payload: err.response.data.message})
      })
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(state.successMessage!)
      .then(() => {
        setCopied(true)
      })
      .catch(() => {
        setCopied(false)
      })
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value
    dispatch({type: "event/setErrorMessage", payload: null})
    dispatch({type: "event/setSuccessMessage", payload: null})
    dispatch({type: "event/setUrlText", payload: value})
  }
  
  return (
    <Container>
      <main>
        <section className="flex flex-col justify-items-center items-center py-40 space-y-10">
          <Typography as="h1">
            url shortener 
          </Typography>
          <Form onSubmit={handleSubmit} className="space-y-3">
            <FieldGroup>
              <FieldLabel htmlFor="url" className="space-y-1">
                <FieldInput placeholder="https://" name="url" onChange={handleChange} value={state.url} />
                {state.errorMessage?.length > 0 && (
                  <FieldMessage variant="error">
                    {state.errorMessage}
                  </FieldMessage>
                )}
                {state.successMessage?.length > 0 && (
                  <div className="flex flex-1">
                    <FieldMessage className="flex-1" variant="success">
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
              <Button type="submit">
                Shorten
              </Button> 
            </div>
          </Form>
        </section>
      </main>
    </Container>
  );
}
