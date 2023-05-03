import React from "react";
import Router from "./Router";
import { ThemeProvider } from "styled-components";
import theme from "./style/theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router />
    </ThemeProvider>

  );
}

export default App;
