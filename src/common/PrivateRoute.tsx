import { useAuth } from '@hooks/auth/useAuth';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  const { user } = useAuth();
  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
