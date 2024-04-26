import * as React from 'react';
import { Header } from '../components/Header';
import useTitle from '../hooks/useTitle';
import { UserAccount } from '../components/UserAccount/UserAccount';

export const AccountPage = () => {
  useTitle('My account - CopyMaster');

  return (
    <>
      <Header />

      <UserAccount />
    </>
  );
};

export default AccountPage;