import React, { FC, Suspense, PropsWithChildren, lazy } from 'react'
import App from '../App'
import Fallback from '../components/Fallback/Fallback'
import { PATHS } from '../types'

const AsyncComponent: FC<PropsWithChildren> = ({ children }) => (
  <Suspense fallback={<Fallback />}>{children}</Suspense>
)

const HistoryCard = lazy(() => import('../components/HistoryCard/HistoryCard'))
const ErrorPage = lazy(() => import('../components/ErrorPage/ErrorPage'))
const Settings = lazy(() => import('../components/Settings/Settings'))

export const routes = [
  {
    path: PATHS.root,
    element: <App />,
    errorElement: (
      <AsyncComponent>
        <ErrorPage />
      </AsyncComponent>
    ),
    children: [
      {
        path: PATHS.settings,
        element: (
          <AsyncComponent>
            <Settings />
          </AsyncComponent>
        ),
      },
    ],
  },
  {
    path: PATHS.history,
    element: (
      <AsyncComponent>
        <HistoryCard />
      </AsyncComponent>
    ),
    errorElement: (
      <AsyncComponent>
        <ErrorPage />
      </AsyncComponent>
    ),
  },
]
