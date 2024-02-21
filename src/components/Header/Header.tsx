import React, { useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import './Header.scss';
import SidebarRight from '../SidebarRight/SidebarRight';
import imageLogo from '../../assets/images/header/copymaster_logo.svg';
import imageLanguage from '../../assets/images/header/language.svg';
import { Dropdown, OverlayTrigger, Tooltip } from 'react-bootstrap';
import useAuth from '../../hooks/useAuth';
import { client } from '../../api/fetchClient';
import { UserDataType } from '../../types/types';
import { toast } from 'react-toastify';
import { logout } from '../../api/api_helpers';

export const Header = () => {
  // const [userData, setUserData] = useState<UserDataType>();
  const { isAuthenticated, setAuth } = useAuth();
  const { pathname } = useLocation();

  // const loadUserData = async () => {
  //   try {
  //     const loadedData = await client.get<UserDataType>('/user');

  //     setUserData(() => loadedData);
  //   } catch (error) {
  //     toast.error(`${error}`);
  //   }
  // };

  const handleLogout = async () => {
    if (await logout()) {
      setAuth(false);
    }
  };

  useEffect(() => {
    const checkUser = async () => {
      try {
        const loadedData = await client.get<UserDataType>('/user');
  
        if (loadedData.body.hasOwnProperty('email')) {
          setAuth(true);
        } else {
          setAuth(false);
        }
      } catch (error) {
        toast.error(`${error}`);
      }
    };

    // if (isAuthenticated === true) {
    //   checkUser();
    //   return;
    // }

    checkUser();

  }, [isAuthenticated, setAuth]);

  return (
    <header className={pathname === '/' ? 'header' : ''}>
      <div className='header__container'>
        <div className='d-flex gap-5 align-items-center'>
          <Link to={'/'}>
            <img src={imageLogo} alt='CopyMaster logo' className='header__logo' />
          </Link>

          <nav className='d-none d-xl-flex gap-5 align-items-center'>
            <NavLink to='/bots' className='header__links'>Bots</NavLink>
            <NavLink to='/markets' className='header__links'>Markets</NavLink>
            <NavLink to='/alerts' className='header__links'>Alerts</NavLink>
          </nav>
        </div>

        <button className='header__button header__button--border'>Donate</button>

        <div className='d-none d-sm-flex align-items-center gap-4'>
        {isAuthenticated 
        ? (
            <Dropdown data-bs-theme='dark' className='d-none d-sm-block'>
              <Dropdown.Toggle>
                <svg width='40' height='40' viewBox='0 0 48 48' fill='none' xmlns='http://www.w3.org/2000/svg'>
                  <g id='not user'>
                    <path id='Rectangle 1' d='M6 24C6 14.0589 14.0589 6 24 6C33.9411 6 42 14.0589 42 24C42 33.9411 33.9411 42 24 42C14.0589 42 6 33.9411 6 24Z' fill='#FAFAFA' stroke='#FAFAFA' strokeWidth='4' />
                    <circle id='Ellipse 46' cx='24' cy='20' r='8' fill='#0F0F0F' />
                    <path id='Intersect' fillRule='evenodd' clipRule='evenodd' d='M36.5394 36.6559C36.5959 36.7532 36.5783 36.8762 36.4973 36.9544C33.2598 40.0784 28.8542 42 23.9999 42C19.1462 42 14.7412 40.0789 11.5038 36.9556C11.4228 36.8775 11.4051 36.7545 11.4616 36.6572C13.7546 32.7111 18.5084 30 24.0009 30C29.4928 30 34.2461 32.7105 36.5394 36.6559Z' fill='#0F0F0F' />
                  </g>
                </svg>
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item eventKey="1">
                  Dashboard
                </Dropdown.Item>
                <Dropdown.Item eventKey="2">
                  Settings
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item eventKey="3" onClick={handleLogout}>
                  Logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          )
        : (
          <>
            <Link to={'/signin'}>Sign in</Link>
            <Link to={'/signup'} className='header__button header__button--fill'>Sign up</Link>
          </>
        )}

          <OverlayTrigger
            placement='bottom'
            overlay={
              <Tooltip id={'tooltip-language'} data-bs-theme='dark'>
                English
              </Tooltip>
            }
          >
            <img src={imageLanguage} alt='Language switcher' className='d-none d-sm-block' style={{ cursor: 'pointer' }} />
          </OverlayTrigger>
        </div>

        <div className='d-flex d-xl-none align-items-center'>
          <SidebarRight />
        </div>
      </div>
    </header>
  );
};