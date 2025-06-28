import { useAuthContext } from '@hooks/auth/useAuthContext';

export const useAuth = () => {
  const { userId, user } = useAuthContext();
  return { userId, user };
};
