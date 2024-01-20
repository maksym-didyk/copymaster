import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.scss';
import SidebarRight from '../SidebarRight/SidebarRight';
import imageLogo from '../../assets/images/header/copymaster_logo.svg';
import imageLanguage from '../../assets/images/header/language.svg'
import { SignIn } from '../SignIn';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

export const Header = () => {
  const [showSignIn, setShowSignIn] = useState(false);
  // const [showSignUp, setShowSignUp] = useState(false);
  
  const handleCloseModals = () => {
    setShowSignIn(() => false);
    // setShowSignUp(() => false);
  };

  const handleShowSignIn = () => setShowSignIn(() => true);
  return (
    <>
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
            <button className='header__button' onClick={handleShowSignIn}>Sign in</button>
            <Link className='header__button header__button--fill' to={'/signup'}>Sign up</Link>
          </div>

          <OverlayTrigger
          placement='bottom'
          overlay={
            <Tooltip id={`tooltip-language`} data-bs-theme='dark'>
              English
            </Tooltip>
          }
        >
          <img src={imageLanguage} alt='Language switcher' style={{ cursor: 'pointer' }} />
        </OverlayTrigger>

          

          <div className='d-flex d-xl-none align-items-center'>
            <SidebarRight />
          </div>
        </div>
      </header>
    
      <SignIn show={showSignIn} onClose={handleCloseModals} />
    </>
  );
};
