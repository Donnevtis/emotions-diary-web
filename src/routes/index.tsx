import React from 'react';
import App from '../App';
import ErrorPage from '../components/ErrorPage/ErrorPage';
import Settings from '../components/Settings/Settings';
import { PATHS } from '../types';

export const routes = [
  {
    path: PATHS.root,
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: PATHS.settings,
        element: <Settings />,
      },
    ],
  },
];
