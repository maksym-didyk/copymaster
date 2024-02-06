import * as React from 'react';
import { Header } from '../components/Header';
import { Markets } from '../components/Markets/Markets';
import useTitle from '../hooks/useTitle';

export const MarketsPage = () => {
  useTitle('Markets - CopyMaster');

  return (
    <>
      <Header />

      <Markets />
    </>
  );
};

export default MarketsPage;