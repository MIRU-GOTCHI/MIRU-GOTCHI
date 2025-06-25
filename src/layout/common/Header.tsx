import styled from 'styled-components';
import LogoImage  from "../../assets/images/logo.png";
import { Link } from 'react-router-dom';

const HeaderArea = styled("header") ({
  position: "fixed",
  top:0,
  left: 0,
  width: "100%",
  // backgroundColor: "rgba(255,255,255,0.7)",
  backgroundColor: "rgba(242,242,243,0.7)",
})

const Inner = styled("div") ({
  display:"flex",
  justifyContent: "space-between",
  alignItems: "center",
  height: "100%",
  maxWidth: "1280px",
  minWidth: "320px",
  margin: "0 auto",
  padding: "15px 0 10px",
})

const Logo = styled("h1") ({
  position: "relative",
  overflow: "hidden",
  fontSize: 0,
  "& > a" :{
    display: "inline-block",
    // height: "",
    padding: "0 15px",
  },
  "& img": {
    height: "26px",
    width: "auto",
  },
  "& .hideTxt": {
    position:"absolute",
    left: "-9999px",
    top: "-1px",
    width: 0,
    height: 0,
    fontSize: 0,
    color: "transparent"
  }
})

const LogOutBtn = styled("button") ({
  backgroundColor: "transparent",
})

const AppHeader = () => {
  return (
    <HeaderArea>
      <Inner>
        <Logo>
            <Link to="/">
              <img src={LogoImage} alt='미루고치'/>
              <span className='hideTxt'>미루고치</span>
            </Link>
        </Logo>
        <LogOutBtn type='button'>로그아웃</LogOutBtn>
      </Inner>
    </HeaderArea>
  )
}

export default AppHeader