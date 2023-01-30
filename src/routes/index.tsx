import React from 'react';

import App from '../App';
import ErrorPage from '../components/ErrorPage/ErrorPage';
import Settings from '../components/Settings/Settings';

export const routes = [
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'settings/',
        element: <Settings />,
      },
    ],
  },
];
