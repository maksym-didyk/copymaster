import React from 'react';
import { Header } from '../components/Header';
import useTitle from '../hooks/useTitle';
import { ControlApi } from '../components/ControlApi/ControlApi';

export const APIPage = () => {
  useTitle('Your API - CopyMaster');

  return (
    <>
      <Header />

      <ControlApi />
    </>
  );
};

export default APIPage;