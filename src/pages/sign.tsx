import React, { useEffect } from 'react';
import { Sign } from '../components/Sign';

export const SignPage = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
      scrollToTop();
    }, []);

  return (

    <Sign />

  );
};

export default SignPage;