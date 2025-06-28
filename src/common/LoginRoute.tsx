import { useAuth } from '@hooks/auth/useAuth';
import * as React from 'react';
import { Navigate } from 'react-router-dom';

const LoginRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();

  return user ? <Navigate to="/" replace /> : <>{children}</>;
};

export default LoginRoute;
