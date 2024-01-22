import React from 'react';
import { Link } from 'react-router-dom';
import './Header.scss';
import SidebarRight from '../SidebarRight/SidebarRight';
import imageLogo from '../../assets/images/header/copymaster_logo.svg';
import imageLanguage from '../../assets/images/header/language.svg';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

export const Header = () => {
  return (
    <header className='header'>
      <div className='header__container'>
        <div className='d-flex gap-5 align-items-center'>
          <Link to={'/'}>
            <img src={imageLogo} alt='CopyMaster logo' className='header__logo' />
          </Link>

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
          <Link to={'/signin'} className='header__button'>Sign in</Link>
          <Link to={'/signup'} className='header__button header__button--fill' >Sign up</Link>
        </div>

        <OverlayTrigger
          placement='bottom'
          overlay={
            <Tooltip id={`tooltip-language`} data-bs-theme='dark'>
              English
            </Tooltip>
          }
        >
          <img src={imageLanguage} alt='Language switcher' className='d-none d-md-block' style={{ cursor: 'pointer' }} />
        </OverlayTrigger>

        <div className='d-flex d-xl-none align-items-center'>
          <SidebarRight />
        </div>
      </div>
    </header>
  );
};
