import React, { FormEvent, useEffect, useState } from 'react';
import './SignUp.scss';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import imageLogo from '../../assets/images/header/copymaster_logo.svg';
import useAuth from '../../hooks/useAuth';
import { client } from '../../utils/fetchClient';
// import useTitle from '../hooks/useTitle';

export const SignUp = () => {
  const [inputName, setInputName] = useState('');
  const [inputEmail, setInputEmail] = useState('');
  const [inputPassword, setInputPassword] = useState('');

  const { setAuth } = useAuth();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const loadData = async () => {
    const userData = await client.post<any>(`/j_spring_security_check?j_login=${inputEmail}&j_password=${inputPassword}&remember-me=true`);

    if (userData.body.authorized === true) {
      setAuth(true);
      navigate(from, { replace: true });
    }
  };

  let register = false;

  if (location.pathname === '/signup') {
    register = true;
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (inputEmail && inputPassword) {
      loadData();
    }
  };

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

        <form onSubmit={handleSubmit} className='d-flex flex-column justify-content-center align-items-center gap-2'>
          <h1 className='mb-4'>
            {register ? 'Sign up' : 'Sign in'}
          </h1>

          {register && (
            <label>
              <input 
                type='text'
                value={inputName}
                onChange={e => setInputName(e.target.value)}
                placeholder='Name'
                className='signup__input'
              />
              <p className='signup__error'>Error name</p>
            </label>
          )}

          <label>
            <input 
              type='text'
              value={inputEmail}
              onChange={e => setInputEmail(e.target.value)}
              placeholder='Login'
              className='signup__input' 
              // pattern='[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}' 
            />
            <p className='signup__error'>Error e-mail</p>
          </label>

          <label>
            <input 
              type='password'
              value={inputPassword}
              onChange={e => setInputPassword(e.target.value)}
              placeholder='Password'
              className='signup__input'
            />
            <p className='signup__error'>Error password</p>
          </label> 

          {register
          ? (<Link to={'/signin'} className='header__button header__button--fill px-5 py-2'>Sign up</Link>)
          : (<button
              type="submit"
              className='header__button header__button--fill px-5 py-2'
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
          ? (
            <>
              Already have an account?
              {' '}
              <Link to={'/signin'} className='signup__link'>
                Sign in
              </Link>
            </>
          )
          : (
            <>
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