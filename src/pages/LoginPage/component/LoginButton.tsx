import { useAuth } from '@hooks/auth/useAuth';
import { logout, signInWithGoogle } from '@lib/firebaseAuth';
import GoogleIcon from '@mui/icons-material/Google';
import { Button, Typography } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const GoogleLoginButton = styled(Button)({
  width: '100%',
  height: '52px',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.15)',
  transition: 'transform 0.1s',
  '&:hover': {
    backgroundColor: '#B0E501 !important',
    color: '#777',
    boxShadow: '0 3px 4px rgba(0, 0, 0, 0.15) !important',
  },
  '&:focus': {
    outline: 'none',
    boxShadow: '0 0 0 3px rgba(34, 113, 191, 0.5)',
  },
  '&:active': {
    transform: 'scale(0.98)',
  },
});
const LoginButton = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (loading) return;
    setLoading(true);

    try {
      await signInWithGoogle();
      navigate('/');
    } catch (error) {
      console.error('로그인 실패', error);
      alert('로그인에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
  };
  return user ? (
    <Button onClick={handleLogout} className='logoutBtn'>로그아웃</Button>
  ) : (
    <GoogleLoginButton startIcon={<GoogleIcon />} onClick={handleLogin}>
      <Typography variant="h6"> 구글로 시작하기!</Typography>
    </GoogleLoginButton>
  );
};

export default LoginButton;
