import React from "react";
import ReactDOM from "react-dom";
import styled, { createGlobalStyle } from "styled-components";

import GenderToggle from "./GenderToggle";
import Slider from "./Slider";

const GlobalStyle = createGlobalStyle`
  :root {
    --color-primary: 150, 188, 51;
    --color-error: salmon;
    --color-black10: rgba(0, 0, 0, 0.1);
    --color-black30: rgba(0, 0, 0, 0.3);
    --color-text: rgb(10, 10, 10);

    --anim-ease: cubic-bezier(0.68, -0.55, 0.27, 1.55);
  }
`;

const StyledApp = styled.div`
  font-family: "Helvetica Neue", sans-serif;

  form {
    display: grid;
    gap: 5vh;
    align-content: center;
    justify-content: center;
    min-height: 100vh;
  }
`;

function App() {
  return (
    <StyledApp className="App">
      <GlobalStyle />
      <form action="">
        <GenderToggle />

        <Slider />
      </form>
    </StyledApp>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
