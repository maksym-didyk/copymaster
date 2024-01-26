import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import HomePage from './pages/home';
import SignUpPage from './pages/signup';
import MarketsPage from './pages/markets';
import { PrivateRoute } from './components/PrivateRoute';
import LogoutPage from './pages/logout';
import TestPage from './pages/test';

function App() {
  return (
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/signin" element={<SignUpPage />} />
        <Route path="/test" element={<TestPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
        
        <Route element={<PrivateRoute />}>
          <Route path="/markets" element={<MarketsPage />} />
          <Route path="/logout" element={<LogoutPage />} />
        </Route>
      </Routes>
  );
}

export default App; 
