import React from 'react';
import './Header.scss';
import SidebarRight from '../SidebarRight/SidebarRight';
import imageLogo from '../../assets/images/header/copymaster_logo.svg';

export const Header = () => {
  return (
    <header className='header'>
      <div className='header__container'>
        <div className='d-flex gap-5 align-items-center'>
          <img src={imageLogo} alt='CopyMaster logo' className='header__logo' />
          <ul className='d-none d-xl-flex gap-5 align-items-center'>
            <li><a href='#/'>Buy</a></li>
            <li><a href='#/'>Markets</a></li>
            <li><a href='#/'>Trade</a></li>
            <li><a href='#/'>Assets</a></li>
            <li><a href='#/'>News</a></li>
          </ul>
        </div>

        <button className='header__button header__button--border'>Donate</button>

        <div className='d-none d-sm-flex align-items-center'>
          <button className='header__button'>Sign in</button>
          <button className='header__button header__button--fill'>Sign up</button>
        </div>

        <div className='d-flex d-xl-none align-items-center'>
          <SidebarRight />
        </div>
      </div>
    </header>
  );
};
