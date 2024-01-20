import React from 'react';
import './SignUp.scss';
import { Link } from 'react-router-dom';
import imageLogo from '../../assets/images/header/copymaster_logo.svg';


export const SignUp = () => {
  return (
    <section className='signup'>
      <Link to={'/'}>
        <img src={imageLogo} alt='CopyMaster logo' className='header__logo m-5' />
      </Link>

      <form className='d-flex flex-column align-items-center gap-3 w-40'>
        <h1>Sign up</h1>

        <input type='text' className='input' placeholder='Name' id='name' />

        <input type='email' className='input' placeholder='E-mail' id='email' />

        <input type='password' className='input' placeholder='Password' id='password' />

        <button className='header__button header__button--fill'>Sign in</button>
      </form>

    </section>
  );
}