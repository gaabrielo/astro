import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './pages/App';
import {
  BrowserRouter,
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';

import './index.css';
import Burger from './pages/Burger';

// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <App />,
//   },
//   {
//     path: '/:burgerId',
//     element: <Burger />,
//   },
// ]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter basename="/">
      {/* <RouterProvider router={router} /> */}
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
