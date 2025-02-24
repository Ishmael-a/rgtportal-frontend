import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { Provider } from 'react-redux';
import { Store } from './state/store';
import AuthContextProvider from "./contexts/AuthContextProvider"


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={Store}>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </Provider>
  </StrictMode>,
)
