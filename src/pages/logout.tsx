import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { client } from '../api/fetchClient';
import { toast } from 'react-toastify';

export const LogoutPage = () => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const fromLocation = location.state?.from?.pathname || '/';
  
  useEffect(() => {
    const loadData = async () => {
      try {
        const userData = await client.get<any>('/logout');
  
        if (userData.body.authorized === false) {
          setAuth(false);
          navigate(fromLocation, { replace: true });
          toast.success('You are logged out');
        } else {
          toast.error(`Something went wrong`);
        }
      } catch (error) {
        toast.error(`${error}`);
      }
    };

    // const logoutData = async () => {
    //   // try {
    //     const userData = await axios.get(API_URL + '/logout', {
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //       withCredentials: true,
    //     })
    //     .then((response) => {
    //       return response.data;
    //     })

    //     if (userData.body.authorized === false) {
    //       setAuth(false);
    //       toast.success('You are logged out');
    //     }
  
      //   console.log('Ответ от сервера:', userData.data);
  
      //   if (userData.data.body.authorized === true) {
      //     setAuth(true);
      //     navigate('/test', { replace: true });
      //   }
  
      // } catch (error) {
      //   toast.error(`${error}`);
      // }
    // };

  loadData();

  }, [fromLocation, navigate, setAuth])

  return (
    <>You are logouted</>
  );
};

export default LogoutPage;