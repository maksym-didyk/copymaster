import React, { useState } from 'react';
import { Dropdown, Offcanvas } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import imageLanguage from '../../assets/images/header/language.svg';
import imageLogo from '../../assets/images/header/copymaster_logo.svg';

const SidebarRight = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { isAuthenticated } = useAuth();

  return (
    <>

    <button className="header__burger" onClick={handleShow} />

    
    <Offcanvas show={show} onHide={handleClose} placement='end' data-bs-theme='dark' className='bg-black' >
        <Offcanvas.Header  className='mt-2 me-1' closeButton>
          <Offcanvas.Title>
            <img src={imageLogo} alt='CopyMaster logo' className='header__logo' />
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className='d-flex flex-column gap-4 p-4'>
        {isAuthenticated || (
          <div className='d-flex align-items-center gap-3'>
            <Link to={'/signin'} className='header__button header__button--border w-50'>Sign in</Link>
            <Link to={'/signup'} className='header__button header__button--fill w-50'>Sign up</Link>
          </div>
        )}

          <ul className='d-flex flex-column gap-2' >
            <li><Link to='#'>Buy</Link></li>
            <li><Link to='/markets'>Markets</Link></li>
            <li><Link to='#'>Trade</Link></li>
            <li><Link to='#'>Assets</Link></li>
            <li><Link to='#'>News</Link></li>
            <li><img src={imageLanguage} alt='Language switcher' /> English</li>
            {isAuthenticated &&  <li><Link to='/logout'>Logout</Link></li>}
          </ul>

          <Dropdown>
          <Dropdown.Menu>
            <Dropdown.Item eventKey="1">
                <Link to='/logout'>Logout</Link>
            </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item eventKey="1">
                <Link to='/logout'>Logout</Link>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Offcanvas.Body>
    </Offcanvas>
    </>
  );
};

export default SidebarRight;