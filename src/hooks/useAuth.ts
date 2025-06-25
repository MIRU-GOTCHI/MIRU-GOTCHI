import { useAuthContext } from '@context/AuthContext';

export const useAuth = () => {
  const { userId } = useAuthContext();
  return { userId };
};
