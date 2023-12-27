import React from 'react';
import './Header.scss';
const imageLogo = require('../../assets/images/copymaster_logo.svg').default;

export const Header = () => {
  return (
    <header className='header'>
      <div className='header__container'>
        <img src={imageLogo} alt='CopyMaster logo' />
      </div>
    </header>
  );
};
