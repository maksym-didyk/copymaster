import { Navigate, Outlet, useLocation } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

export const PrivateRoute = () => {
  const { isAuthenticated } = useAuth();

  // Получаем текущий маршрут из хука useLocation
  const location = useLocation();

  return (
    // Если пользователь авторизован, то рендерим дочерние элементы текущего маршрута, используя компонент Outlet
    isAuthenticated === true ?
      <Outlet />
      // Если пользователь не авторизован, то перенаправляем его на маршрут /signin с помощью компонента Navigate.
      // Свойство replace указывает, что текущий маршрут будет заменен на новый, чтобы пользователь не мог вернуться обратно, используя кнопку "назад" в браузере.
      :
      <Navigate to="/signin" state={{ from: location }} replace />
  )
};
