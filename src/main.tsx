import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from '@emotion/react';
import { RouterProvider } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import { theme } from 'theme/theme.ts';
import router from 'routes/router.tsx';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { UserProvider } from 'routes/context/UserContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <UserProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <RouterProvider router={router} />
      </ThemeProvider>
    </UserProvider>
  </React.StrictMode>
);
