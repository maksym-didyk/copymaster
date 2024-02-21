import React from 'react';
import { Link } from 'react-router-dom';
import useTitle from '../hooks/useTitle';
import { Header } from '../components/Header';

export const NotFoundPage = () => {
  useTitle('Not found page - CopyMaster');

  return (
    <>
      <Header />

      <main className='text-center pt-5 mt-5'>
        <h1>404</h1>
        <p className='text-center pt-5'>Sorry! The page you're looking for cannot be found. </p>
        <div className='pt-4'><Link to={'/'} className='header__links active'>Go to Homepage</Link></div>
      </main>
    </>

  );
};

export default NotFoundPage;