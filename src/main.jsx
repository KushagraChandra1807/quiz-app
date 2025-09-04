

import React from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { CssBaseline } from '@mui/material'
import { MantineProvider } from '@mantine/core'
import App from './App'
import Home from './pages/Home'
import Quiz from './pages/Quiz'
import Results from './pages/Results'
import './index.css'
import { ThemeProvider } from '@emotion/react'
import theme from './theme'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: 'quiz', element: <Quiz /> },
      { path: 'results', element: <Results /> },
    ],
  },
])

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <CssBaseline />
        <RouterProvider router={router} />
      </MantineProvider>
    </ThemeProvider>
  </React.StrictMode>
)
