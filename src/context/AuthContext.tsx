import { createContext } from 'react';

export const AuthContext = createContext<{ userId: string | null }>({ userId: 'testUserId' });
