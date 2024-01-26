import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

export const LogoutPage = () => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    setAuth(false)
    navigate('/');
  }, [setAuth, navigate])

  return (
    <></>
  )
}

export default LogoutPage;
