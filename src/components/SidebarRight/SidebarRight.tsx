import React, { useState } from 'react';
import { Offcanvas } from 'react-bootstrap';

const SidebarRight = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const imageLogo = require('../../assets/images/header/copymaster_logo.svg').default;

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
          <div className='d-flex align-items-center gap-3'>
            <button className='header__button header__button--border w-50'>Sign in</button>
            <button className='header__button header__button--fill w-50'>Sign up</button>
          </div>

          <ul className='d-flex flex-column gap-2'>
            <li><a href='#/'>Buy</a></li>
            <li><a href='#/'>Markets</a></li>
            <li><a href='#/'>Trade</a></li>
            <li><a href='#/'>Assets</a></li>
            <li><a href='#/'>News</a></li>
          </ul>
        </Offcanvas.Body>
    </Offcanvas>
    </>
  );
}

export default SidebarRight;