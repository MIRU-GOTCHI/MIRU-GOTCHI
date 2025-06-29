import LoginButton from '@pages/LoginPage/component/LoginButton';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import Menu from './Menu';
import LogoImage from '../../assets/images/logo_mirugochi.png';

const HeaderArea = styled('header')({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  minHeight: '60px',
  // backgroundColor: "rgba(255,255,255,0.7)",
  backgroundColor: 'rgba(242,242,243,0.7)',
  zIndex: 100,
  '@media (min-width:1280px)': {
    height: '70px',
  },
  '@media (max-width:1279px)': {
    '& .logoutBtn': {
      marginRight: '20px',
    },
  },
  '@media (max-width:750px)': {
    '& .logoutBtn': {
      padding: '4px 4px',
      fontSize: '11px',
    },
  },
});

const Inner = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  height: '100%',
  maxWidth: '1280px',
  minWidth: '320px',
  margin: '0 auto',
  padding: '15px 0 10px',
});

const Logo = styled('h1')({
  position: 'relative',
  overflow: 'hidden',
  fontSize: 0,
  '& > a': {
    display: 'inline-block',
    // height: "",
    padding: '0 15px',
  },
  '& img': {
    height: '26px',
    width: 'auto',
  },
  '& .hideTxt': {
    position: 'absolute',
    left: '-9999px',
    top: '-1px',
    width: 0,
    height: 0,
    fontSize: 0,
    color: 'transparent',
  },
  '@media (min-width:1280px)': {
    '& > a': {
      paddingLeft: 0,
    },
    '& img': {
      height: '30px',
    },
  },
});

const AppHeader = () => {
  return (
    <HeaderArea>
      <Inner>
        <Logo>
          <Link to="/">
            <img src={LogoImage} alt="미루고치" />
            <span className="hideTxt">미루고치</span>
          </Link>
        </Logo>
        <LoginButton />
        {/* <Menu /> */}
      </Inner>
    </HeaderArea>
  );
};

export default AppHeader;
