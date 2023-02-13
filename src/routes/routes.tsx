import React, { FC, Suspense, PropsWithChildren, lazy } from 'react'
import { getSettings } from '../api/api'
import App from '../App'
import FallbackBackdrop from '../components/Fallback/FallbackBackdrop'
import { PATHS } from '../types'

const AsyncComponentBackdrop: FC<PropsWithChildren> = ({ children }) => (
  <Suspense fallback={<FallbackBackdrop />}>{children}</Suspense>
)

const History = lazy(() => import('../components/History/History'))
const ErrorPage = lazy(() => import('../components/ErrorPage/ErrorPage'))
const Settings = lazy(() => import('../components/Settings/Settings'))

export const routes = [
  {
    path: PATHS.root,
    element: <App />,
    errorElement: (
      <AsyncComponentBackdrop>
        <ErrorPage />
      </AsyncComponentBackdrop>
    ),
  },
  {
    path: PATHS.settings,
    loader: () => getSettings(),
    element: (
      <AsyncComponentBackdrop>
        <Settings />
      </AsyncComponentBackdrop>
    ),
    errorElement: (
      <AsyncComponentBackdrop>
        <ErrorPage />
      </AsyncComponentBackdrop>
    ),
  },
  {
    path: PATHS.history,
    element: (
      <AsyncComponentBackdrop>
        <History />
      </AsyncComponentBackdrop>
    ),
    errorElement: (
      <AsyncComponentBackdrop>
        <ErrorPage />
      </AsyncComponentBackdrop>
    ),
  },
]
