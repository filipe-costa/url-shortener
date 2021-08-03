import React from "react";

import { Container } from "./components/Container/Container";
import { UrlShortenerForm, OnSubmitType } from "./components/UrlShortenerForm/UrlShortenerForm";
import { URLService } from "./services/url";


export const App = () => {
  const handleSubmit = ({url, dispatch}: OnSubmitType) => {
    URLService.generate({ url })
      .then((res) => {
        dispatch({ type: "event/setSuccessMessage", payload: res.data.url });
      })
      .catch((err) => {
        dispatch({
          type: "event/setErrorMessage",
          payload: err.response.data.message,
        });
      });
  };

  return (
    <Container>
      <main>
        <section className="flex flex-col justify-items-center items-center py-40 space-y-10">
          <UrlShortenerForm onSubmit={handleSubmit} />
        </section>
      </main>
    </Container>
  );
};
