import { Outlet } from "react-router-dom";
import Header from "./common/Header";
import styled from "styled-components";
import Menu from "./common/Menu";

const Wrap = styled("div") ({
 position: "relative", 
 height: "100%",
 maxWidth: "1280px",
 margin: "0 auto",
 minWidth: "320px",
})

const ContentArea = styled("main") ({
  padding: "70px 20px",
  height: "100%",
})

const AppLayout = () => {
  return (
  <Wrap>
    <Header/>
    <ContentArea>
      <Outlet />
    </ContentArea>
    <Menu />
  </Wrap>
  );
};

export default AppLayout;
