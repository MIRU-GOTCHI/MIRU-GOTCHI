import { AuthContext } from '@context/AuthContext';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  // 나중에 여기에 Firebase 로그인 후 추가
  const userId = 'testUserId';

  return <AuthContext.Provider value={{ userId }}>{children}</AuthContext.Provider>;
};
