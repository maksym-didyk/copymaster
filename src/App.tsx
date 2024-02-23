import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import HomePage from './pages/home';
import SignPage from './pages/sign';
import MarketsPage from './pages/markets';
import { PrivateRoute } from './components/PrivateRoute';
import TestPage from './pages/test';
import WebsocketPage from './pages/websocket';
import NotFoundPage from './pages/404';

function App() {
  return (
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignPage />} />
        <Route path="/signin" element={<SignPage />} />
        <Route path="/test" element={<TestPage />} />
        <Route path="/websocket" element={<WebsocketPage />} />
        <Route path="*" element={<NotFoundPage />} />
        {/* <Route path="*" element={<Navigate to="/" replace />} /> */}

        <Route element={<PrivateRoute />}>
          <Route path="/markets/:tradeTypeUrl/:currentMarketUrl/:currentSymbolUrl/:currentTabUrl" element={<MarketsPage />} />
          <Route path="/markets" element={<Navigate to="/markets/spot/binance/XRP_USDT/buy" />} />
        </Route>
      </Routes>
  );
}

export default App;