import eggLogo from '@assets/images/egg_mirugochi.png';
import logo from '@assets/images/logo_mirugochi.png';
import { Card, Container } from '@mui/material';
import LoginButton from '@pages/LoginPage/component/LoginButton';
import styled from 'styled-components';

const LoginContainer = styled(Container)(() => ({
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

const StyledCard = styled(Card)(() => ({
  width: '100%',
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 4,
  textAlign: 'center',
  gap: 8,
  padding: 24,
  paddingBottom: 100,
}));
const LogoImage = styled('img')({
  width: '200px',
  height: 'auto',
  marginBottom: '1rem',
});
const TextLogoImage = styled('img')({
  width: '240px',
  height: 'auto',
  marginBottom: '1.8rem',
});
const LoginPage = () => {
  return (
    <LoginContainer maxWidth="sm" disableGutters>
      <StyledCard elevation={3}>
        <LogoImage alt="미루고치" src={eggLogo} />
        <TextLogoImage alt="미루고치" src={logo} />
        <LoginButton />
      </StyledCard>
    </LoginContainer>
  );
};

export default LoginPage;
