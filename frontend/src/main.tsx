import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './index.css';
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react';

import history from './utils/history';

import App from './App.tsx';
import { Router } from 'react-router-dom';
import store from './store/store/store.ts';

createRoot(document.getElementById('root')!).render(
 
  <StrictMode>

    <Provider store={store}>
      
        <App />

    </Provider>

  </StrictMode>,
);
