import { useAuthContext } from '@hooks/auth/useAuthContext';

export const useAuth = () => {
  const { userId } = useAuthContext();
  return { userId };
};
