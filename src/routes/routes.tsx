import React, { FC, Suspense, PropsWithChildren, lazy } from 'react'
import App from '../App'
import FallbackBackdrop from '../components/Fallback/FallbackBackdrop'
import FallbackLocal from '../components/Fallback/FallbackLocal'
import { PATHS } from '../types'

const AsyncComponentLocal: FC<PropsWithChildren> = ({ children }) => (
  <Suspense fallback={<FallbackLocal />}>{children}</Suspense>
)
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
    children: [
      {
        path: PATHS.settings,
        element: (
          <AsyncComponentLocal>
            <Settings />
          </AsyncComponentLocal>
        ),
      },
    ],
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
