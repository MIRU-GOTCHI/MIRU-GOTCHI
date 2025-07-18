import { AuthContext } from '@context/AuthContext';
import { useContext } from 'react';

export const useAuthContext = () => useContext(AuthContext);
