import { useAuth } from '@hooks/auth/useAuth';
import { signInWithGoogle } from '@lib/firebaseAuth';

const LoginButton = () => {
  const { user } = useAuth();

  const handleLogin = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error(error);
    }
  };

  return <button></button>;
};

export default LoginButton;
