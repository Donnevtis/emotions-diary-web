import React from 'react'
import ReactDOM from 'react-dom/client'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import CssBaseline from '@mui/material/CssBaseline'
import ThemeProvider from '@mui/material/styles/ThemeProvider'
import type {} from '@mui/x-date-pickers/themeAugmentation'
import theme from './resource/theme'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import { init } from './i18n'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { routes } from './routes'
import dayjs from 'dayjs'
import { language_code } from './telegram'

Telegram.WebApp.ready()

const language = init(language_code).resolvedLanguage
dayjs.locale(language)

const router = createBrowserRouter(routes)

ReactDOM.createRoot(document.getElementById('emd-root') as HTMLElement).render(
  <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={language}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  </LocalizationProvider>
)
