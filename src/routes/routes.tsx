import React, { FC, Suspense, PropsWithChildren, lazy } from 'react'
import { getSettings } from '../api/api'
import App from '../App'
import FallbackBackdrop from '../components/Fallback/FallbackBackdrop'
import MoodPicker from '../layouts/MoodPicker/MoodPicker'
import { PATHS } from '../types'

const AsyncComponentBackdrop: FC<PropsWithChildren> = ({ children }) => (
  <Suspense fallback={<FallbackBackdrop />}>{children}</Suspense>
)

const History = lazy(() => import('../layouts/History/History'))
const ErrorPage = lazy(() => import('../components/ErrorPage/ErrorPage'))
const Settings = lazy(() => import('../layouts/Settings/Settings'))

export const routes = [
  {
    path: PATHS.root,
    element: <App />,
    errorElement: (
      <AsyncComponentBackdrop>
        <ErrorPage />
      </AsyncComponentBackdrop>
    ),
    children: [
      {
        path: PATHS.root,
        loader: () => getSettings(),
        element: (
          <AsyncComponentBackdrop>
            <MoodPicker />
          </AsyncComponentBackdrop>
        ),
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
    ],
  },
]
