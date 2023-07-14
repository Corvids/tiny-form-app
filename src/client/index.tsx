import React from 'react'
import ReactDOM from 'react-dom'
import { App } from './App'
import { ThemeProvider } from '@fluentui/react'
import theme from './fluentTheme'

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>,
  document.getElementById('app')
);
