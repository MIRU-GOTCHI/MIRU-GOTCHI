import { createContext } from 'react';

import type { User } from 'firebase/auth';

export const AuthContext = createContext<{ user: User | null; userId: string | null }>({
  user: null,
  userId: null,
});
