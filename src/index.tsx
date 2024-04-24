import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthProvider';
import App from './App';
import './assets/styles/index.scss';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { AlertsNotSeenProvider } from './context/AlertsNotSeenProvider';
import { MarketPriceProvider } from './context/MarketPriceProvider';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  // <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <MarketPriceProvider>
          <AlertsNotSeenProvider>
            <>
              <App />
              <ToastContainer
                position='bottom-right'
                autoClose={5000}
                theme="dark"
                closeButton
                pauseOnHover
              />
            </>
          </AlertsNotSeenProvider>
        </MarketPriceProvider>
      </AuthProvider>
    </BrowserRouter>
  // </React.StrictMode>
);
