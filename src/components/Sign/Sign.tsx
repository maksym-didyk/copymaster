import React, { FormEvent, useEffect, useState } from 'react';
import './Sign.scss';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import imageLogo from '../../assets/images/header/copymaster_logo.svg';
import useAuth from '../../hooks/useAuth';
import { client } from '../../api/fetchClient';
import { toast } from 'react-toastify';
import classNames from 'classnames';
import { UserDataType, UserPostDataType } from '../../types/types';
import { InputPasswordType } from '../../types/enums';

export const Sign = () => {
  const [inputName, setInputName] = useState('');
  const [inputEmail, setInputEmail] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const [inputPasswordType, setInputPasswordType] = useState(InputPasswordType.password);

  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const { isAuthenticated, setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const currentLocation = location.pathname;
  const fromLocation = location.state?.from?.pathname || '/';

  let isSignUp = false;

  if (currentLocation === '/signup') {
    isSignUp = true;
  };

  const toNavigate = (url = '') => {
    if (url) {
      return navigate(url, { replace: true });
    }

    if (fromLocation === '/signin' || fromLocation === '/signup') {
      return navigate('/', { replace: true });
    }

    return navigate(fromLocation, { replace: true });
  };

  const loadUserData = async () => {
    try {
      const id = toast.loading("Please wait...", { closeButton: true });
      const userData = await client.post<any>(`/j_spring_security_check?j_email=${inputEmail}&j_password=${inputPassword}&remember-me=true`);

      if (userData.body.authorized === false) {
        setAuth(false);
        toast.update(id, { render: 'E-mail or password wrong', type: 'error', autoClose: 5000, isLoading: false });
      } else {
        setAuth(true);
        toNavigate();
        toast.update(id, { render: 'You are authorized', type: 'success', autoClose: 5000, isLoading: false });
      }
    } catch (error) {
      toast.error(`${error}`);
    }
  };

  const postUserData = async (data: UserPostDataType) => {
      try {
        const id = toast.loading("Please wait...", { closeButton: true });
        const userData = await client.post<any>('/user', data);

        if (userData.error) {
          toast.update(id, { render: `${userData.error}`, type: 'error', autoClose: 5000, isLoading: false });
        } else if (userData.body.email) {
          toast.update(id, { render: 'Success. Sign in now', type: 'success', autoClose: 5000, isLoading: false });
          toNavigate('/signin');
        } else {
          toast.update(id, { render: 'ry again, please', type: 'info', autoClose: 5000, isLoading: false });
        }
      //   const userData = await axios.post<any>(API_URL + '/user', data, {
      //     withCredentials: true,
      //   })
      //   .then((response) => {
      //     toast.success(`${response.data}`);
      //   })
      //   .catch((error) => {
      //     toast.error(`${error}`);
      //   })
      } catch (error) {
        toast.error(`${error}`);
      }
  };

  const resetInputErrors = () => {
    setNameError(() => '');
    setEmailError(() => '');
    setPasswordError(() => '');
  }

  const handleChangeInputPasswordType = () => {
    if (inputPasswordType === InputPasswordType.password) {
      setInputPasswordType(() => InputPasswordType.text);
    }

    if (inputPasswordType === InputPasswordType.text) {
      setInputPasswordType(() => InputPasswordType.password);
    }
  };

  const validateFields = () => {
    let isValid = true;

    // Check name
    if (isSignUp && inputName.trim() === '') {
      setNameError('Please enter your name');
      isValid = false;
    } else {
      setNameError('');
    }

    // Check email
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(inputEmail)) {
      setEmailError('Please enter a valid email');
      isValid = false;
    } else {
      setEmailError('');
    }

    // Check password
    if (inputPassword.trim() === '') {
      setPasswordError('Password must be at least 10 characters, contain uppercase, lowercase, digits and special characters and must not be the same as email');
      isValid = false;
    } else if (inputPassword.length < 10) {
        setPasswordError('Password must be at least 10 characters');
        isValid = false;
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]/.test(inputPassword)) {
        setPasswordError('Password must contain uppercase, lowercase, digits and special characters');
        isValid = false;
    } else if (inputEmail.toLowerCase() === inputPassword.toLowerCase()) {
        setPasswordError('Password must not be the same as email');
        isValid = false;
    } else {
        setPasswordError(() => '');
    }

    return isValid;
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!isSignUp) {
      if (inputEmail && inputPassword) {
        await loadUserData();
      } else {
        toast.error('Login or password empty');
      }
    }

    if (isSignUp && validateFields()) {
      await postUserData({
        email: inputEmail,
        nickname: inputName,
        password: inputPassword,
        passwordConfirmation: inputPassword
      });
    }
  };

  useEffect(() => {
    const checkUser = async () => {
      try {
        const loadedData = await client.get<UserDataType>('/user');
  
        if(loadedData.body.hasOwnProperty('email')) {
          setAuth(true);
        }
      } catch (error) {
        toast.error(`${error}`);
      }
    };

    if (isAuthenticated === true) {
      toNavigate();
      toast.info('You are already authorized');

      return;
    }

    checkUser();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, navigate, setAuth]);

  return (
    <main className='sign'>
      <div className='d-flex flex-column align-items-center gap-4'>
        <Link to={'/'}>
          <img src={imageLogo} alt='CopyMaster logo' className='header__logo my-5' />
        </Link>

        <form onSubmit={handleSubmit} className='d-flex flex-column justify-content-center align-items-center gap-2'>
          <h1 className='mb-4'>
            {isSignUp ? 'Sign up' : 'Sign in'}
          </h1>

          {isSignUp && (
            <div className='sign__input-container'>
              <input
                type='text'
                value={inputName}
                onChange={(e) => setInputName(e.target.value)}
                placeholder='Name'
                className='sign__input'
              />
              <p className='sign__error'>{nameError}</p>
            </div>
          )}

          <div className='sign__input-container'>
            <input
              type='text'
              value={inputEmail}
              onChange={(e) => setInputEmail(e.target.value)}
              placeholder='E-mail'
              className='sign__input'
              // pattern='[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}'
            />
            <p className='sign__error'>{emailError}</p>
          </div>

          <div className='sign__input-container'>
            <input
              type={inputPasswordType}
              value={inputPassword}
              onChange={(e) => setInputPassword(e.target.value)}
              placeholder='Password'
              className='sign__input'
            />
            <span className={classNames('sign__input--eye', { active: inputPasswordType === 'text' })} onClick={handleChangeInputPasswordType}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="12" viewBox="0 0 16 12" fill="#8997DC">
                <path d="M8.00024 0C10.0211 0 11.745 0.992 13.0324 2.078C14.328 3.169 15.2634 4.423 15.7224 5.101C15.9036 5.36719 16.0002 5.68001 16.0002 6C16.0002 6.31999 15.9036 6.63281 15.7224 6.899C15.2634 7.577 14.328 8.831 13.0324 9.922C11.744 11.008 10.0211 12 8.00024 12C5.97942 12 4.25544 11.008 2.96807 9.922C1.67254 8.83 0.737102 7.576 0.278055 6.898C0.0969123 6.63181 0.000244141 6.31899 0.000244141 5.999C0.000244141 5.67901 0.0969123 5.36619 0.278055 5.1C0.737102 4.423 1.67254 3.169 2.96807 2.078C4.25646 0.992 5.97942 0 8.00024 0ZM1.55217 5.932C1.53813 5.95201 1.53061 5.97572 1.53061 6C1.53061 6.02428 1.53813 6.04799 1.55217 6.068C1.97143 6.69 2.81811 7.818 3.96573 8.785C5.11947 9.758 6.49763 10.5 8.00024 10.5C9.50286 10.5 10.882 9.758 12.0348 8.785C13.1814 7.818 14.028 6.689 14.4483 6.068C14.4624 6.04799 14.4699 6.02428 14.4699 6C14.4699 5.97572 14.4624 5.95201 14.4483 5.932C14.028 5.311 13.1814 4.182 12.0348 3.215C10.881 2.242 9.50286 1.5 8.00024 1.5C6.49763 1.5 5.11845 2.242 3.96573 3.215C2.81913 4.182 1.97245 5.311 1.55217 5.932ZM8.00024 8C7.72855 8.00602 7.45837 7.95877 7.20556 7.86103C6.95275 7.76328 6.72241 7.61701 6.52806 7.4308C6.33371 7.24458 6.17927 7.02218 6.0738 6.77666C5.96834 6.53113 5.91398 6.26742 5.91391 6.00101C5.91384 5.7346 5.96807 5.47087 6.07341 5.22529C6.17875 4.97971 6.33307 4.75723 6.52733 4.57093C6.72158 4.38462 6.95185 4.23823 7.20461 4.14036C7.45737 4.04249 7.72753 3.99511 7.99922 4.001C8.53229 4.01256 9.03956 4.22822 9.41245 4.60184C9.78533 4.97545 9.99419 5.47732 9.99433 6.00001C9.99446 6.5227 9.78585 7.02467 9.41316 7.39847C9.04047 7.77227 8.53331 7.98818 8.00024 8Z" fill="#8997DC"/>
              </svg>
            </span>

            <p className='sign__error'>{passwordError}</p>
          </div>

          <button type="submit" className='header__button header__button--fill px-5 py-2'>
            {isSignUp ? 'Sign up' : 'Sign in'}
          </button>
        </form>

        <div className='d-flex flex-row align-items-center gap-3'>
          <hr className='sign__hr' />

          <span>or</span>

          <hr className='sign__hr' />
        </div>

        <button className='sign__google'>
          <div className='sign__google-image'/> Google
        </button>

        <div>
          {isSignUp
          ? (
            <>
              Already have an account?
              {' '}
              <Link to={'/signin'} onClick={resetInputErrors} className='sign__link'>
                Sign in
              </Link>
            </>
          )
          : (
            <>
              Don't have an account?
              {' '}
              <Link to={'/signup'} className='sign__link'>
                Sign up
              </Link>
            </>
          )}
        </div>
      </div>
    </main>
  );
};