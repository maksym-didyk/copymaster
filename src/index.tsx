import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthProvider';
import App from './App';
import './assets/styles/index.scss';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  // <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
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
      </AuthProvider>
    </BrowserRouter>
  // </React.StrictMode>
);
