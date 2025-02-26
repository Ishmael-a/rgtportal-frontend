import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { Provider } from 'react-redux';
import { Store } from './state/store';
import AuthContextProvider from "./contexts/AuthContextProvider"
import {QueryClient, QueryClientProvider} from "@tanstack/react-query"
import {ReactQueryDevtools} from "@tanstack/react-query-devtools"

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={Store}>
    <QueryClientProvider  client={queryClient}>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>

      <ReactQueryDevtools/>
    </QueryClientProvider>
    </Provider>
  </StrictMode>,
)
