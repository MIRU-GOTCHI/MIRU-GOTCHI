import { createContext, useContext } from 'react';

const AuthContext = createContext<{ userId: string | null }>({ userId: 'testUserId' });

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  // 나중에 여기에 Firebase 연동 추가할 예정
  const userId = 'testUserId';

  return <AuthContext.Provider value={{ userId }}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => useContext(AuthContext);
