import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './index.css';
import { Provider } from 'react-redux'

import App from './App.tsx';
import store from './store/store/store.ts';
import { ToastContainer } from 'react-toastify';
import { CssBaseline } from '@mui/material';
import 'react-toastify/dist/ReactToastify.css';

createRoot(document.getElementById('root')!).render(
 
  <StrictMode>

    <Provider store={store}>
      <CssBaseline />
      <ToastContainer className="toast-container" />
        <App />

    </Provider>

  </StrictMode>,
);
