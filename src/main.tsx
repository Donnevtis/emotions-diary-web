import React from 'react'
import ReactDOM from 'react-dom/client'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
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
import FallbackBackdrop from './components/Fallback/FallbackBackdrop'
import { queryParam } from './utils/utils'
import { language_code } from './telegram'

const languageCode = queryParam.get('lang') || language_code

init(languageCode).then(({ resolvedLanguage }) => {
  Telegram.WebApp.ready()

  dayjs.locale(resolvedLanguage)

  const router = createBrowserRouter(routes)

  ReactDOM.createRoot(
    document.getElementById('emd-root') as HTMLElement
  ).render(
    <LocalizationProvider
      dateAdapter={AdapterDayjs}
      adapterLocale={resolvedLanguage}
    >
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <RouterProvider
          router={router}
          fallbackElement={<FallbackBackdrop />}
        />
      </ThemeProvider>
    </LocalizationProvider>
  )
})
