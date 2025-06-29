import Loading from '@common/components/Loading';
import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

import Header from './common/Header';
import Menu from './common/Menu';

const Wrap = styled('div')({
  position: 'relative',
  height: '100%',
  maxWidth: '1280px',
  margin: '0 auto',
  minWidth: '340px',
});

const ContentArea = styled('main')({
  padding: '70px 20px',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  '@media (min-width:1280px)': {
    padding: '120px 0 50px',
    // height: 'calc(100% - 50px)',
  },
});

const AppLayout = () => {
  return (
    <Wrap>
      <Header />
      <ContentArea>
        <Suspense fallback={<Loading />}>
          <Outlet />
        </Suspense>
      </ContentArea>
      <Menu />
    </Wrap>
  );
};

export default AppLayout;
