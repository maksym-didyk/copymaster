import React from 'react';
import './SignUp.scss';
import { Link } from 'react-router-dom';
import imageLogo from '../../assets/images/header/copymaster_logo.svg';


export const SignUp = () => {
  return (
    <section className='signup'>
      <div className='d-flex flex-column align-items-center gap-4'>
        <Link to={'/'}>
          <img src={imageLogo} alt='CopyMaster logo' className='header__logo my-5' />
        </Link>

        <form autoComplete='off' className='d-flex flex-column justify-content-center align-items-center gap-2'>
          <h1 className='mb-4'>Sign up</h1>

          <label>
            <input type='text' className='signup__input' placeholder='Name' />
            <p className='signup__error'>Error name</p>
          </label>

          <label>
            <input type='email' className='signup__input' placeholder='E-mail' pattern='[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}' />
            <p className='signup__error'>Error e-mail</p>
          </label>

          <label>
            <input type='password' className='signup__input' placeholder='Password' />
            <p className='signup__error'>Error password</p>
          </label>     

          <button className='header__button header__button--fill px-5'>Sign up</button>
        </form>

        <div className='d-flex flex-row align-items-center gap-3'>
          <hr className='signup__hr' />

          <span>or</span>

          <hr className='signup__hr' />
        </div>

        <button className='signup__google'>
          <div className='signup__google-image'/> Google
        </button>

        <div>
          Already have an account?
          {` `}
          <Link to={'/signin'} className='signup__link'>
            Sign in
          </Link>
        </div>
      </div>
    </section>
  );
}