import React, { useEffect } from 'react';
import './SignUp.scss';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import imageLogo from '../../assets/images/header/copymaster_logo.svg';
import useAuth from '../../hooks/useAuth';
// import useTitle from '../hooks/useTitle';

export const SignUp = () => {
  const { setAuth } = useAuth();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  let register = false;

  if (location.pathname === '/signup') {
    register = true;
  }

  useEffect(() => {
    if (isAuthenticated === true) {
      navigate('/markets');
    }
  }, [isAuthenticated, navigate]);

  return (
    <main className='signup'>
      <div className='d-flex flex-column align-items-center gap-4'>
        <Link to={'/'}>
          <img src={imageLogo} alt='CopyMaster logo' className='header__logo my-5' />
        </Link>

        <form autoComplete='off' className='d-flex flex-column justify-content-center align-items-center gap-2'>
          <h1 className='mb-4'>
            {register ? 'Sign up' : 'Sign in'}
          </h1>

          {register && (
            <label>
              <input type='text' className='signup__input' placeholder='Name' />
              <p className='signup__error'>Error name</p>
          </label>
          )}

          <label>
            <input type='email' className='signup__input' placeholder='E-mail' pattern='[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}' />
            <p className='signup__error'>Error e-mail</p>
          </label>

          <label>
            <input type='password' className='signup__input' placeholder='Password' />
            <p className='signup__error'>Error password</p>
          </label> 

          {register
          ? (<Link to={'/signin'} className='header__button header__button--fill px-5 py-2'>Sign up</Link>)
          : (<button 
              className='header__button header__button--fill px-5 py-2' 
              onClick={() => {
                setAuth(true)
                navigate(from, { replace: true });
              }}
              >
                Sign in
              </button>)
          }
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
          {register 
          ? (<>
          
            Already have an account?
            {' '}
            <Link to={'/signin'} className='signup__link'>
              Sign in
            </Link>
            </>
          )
          : (<>
            Don't have an account?
            {' '}
            <Link to={'/signup'} className='signup__link'>
              Sign up
            </Link>
            </>
          )
        }
        </div>
      </div>
    </main>
  );
}