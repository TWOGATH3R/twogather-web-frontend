import React from 'react';
import Router from './Router';
import { ThemeProvider } from 'styled-components';
import theme from './style/theme';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router />
      <ReactQueryDevtools initialIsOpen={false} position='bottom-left' />
    </ThemeProvider>
  );
}

export default App;
