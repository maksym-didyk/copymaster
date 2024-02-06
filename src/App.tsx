import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import HomePage from './pages/home';
import SignPage from './pages/sign';
import MarketsPage from './pages/markets';
import { PrivateRoute } from './components/PrivateRoute';
import LogoutPage from './pages/logout';
import TestPage from './pages/test';

function App() {
  return (
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignPage />} />
        <Route path="/signin" element={<SignPage />} />
        <Route path="/test" element={<TestPage />} />
        <Route path="/logout" element={<LogoutPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
        
        <Route element={<PrivateRoute />}>
          <Route path="/markets" element={<MarketsPage />} />
        </Route>
      </Routes>
  );
}

export default App; 
