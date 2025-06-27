import { useAuth } from '@hooks/auth/useAuth';
import { logout, signInWithGoogle } from '@lib/firebaseAuth';
import { Button } from '@mui/material';

const LoginButton = () => {
  const { user } = useAuth();

  const handleLogin = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error(error);
      alert('로그인 실패');
    }
  };

  const handleLogout = () => {
    logout();
  };
  return user ? (
    <Button onClick={handleLogout}>로그아웃</Button>
  ) : (
    <Button onClick={handleLogin}>구글 로그인</Button>
  );
};

export default LoginButton;
