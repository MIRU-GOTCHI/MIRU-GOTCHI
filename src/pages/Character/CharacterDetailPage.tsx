import BeforeBtn from '@common/components/BeforeBtn';
import ContentTitle from '@layout/common/ContentTitle';
import { Box, Grid, Typography } from '@mui/material';
import React from 'react';
import { flushSync } from 'react-dom';
import styled from 'styled-components';

const Container = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  height: '100%',
  backgroundColor: '#F2F2F3',
  padding: '2rem',
});

const Title = styled(Typography)({
  justifyContent: 'center',
  fontSize: '32px !important',
  color: '#050505 !important',
  fontFamily: 'Galmuri14!important',
});

const Description = styled(Typography)({
  justifyContent: 'center',
  fontSize: '16px !important',
  color: '#a4a4a4 !important',
  fontFamily: 'Galmuri14 !important',
  marginBottom: '2rem !important',
});

const GrowthTitle = styled(Typography)({
  fontSize: '16px !important',
  color: '#050505 !important',
  fontFamily: 'Galmuri14!important',
  marginBlock: '1rem !important',
});

const GrowthStageContainer = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '700px',
  alignSelf: 'center',

  backgroundColor: 'grey',
  aspectRatio: '1/1',
});

const UnlockedStage = styled('div')({
  backgroundColor: 'white',
  width: '256px',
  height: '256px',
});

const LockedStage = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: '128px',
  color: '#fafdff',
  backgroundColor: 'black',
  width: '256px',
  height: '256px',
});

const CharacterDetailPage = () => {
  return (
    <Container>
      <ContentTitle>
        <BeforeBtn />
      </ContentTitle>
      <Title>미루몬 프로필</Title>
      <Description>성장 중인 미루몬의 레벨, 경험치 정보를 확인해보세요!</Description>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          alignSelf: 'center',
          backgroundColor: 'blue',
          color: '#fafdff',
          width: '700px',
          aspectRatio: '1/1',
          marginBottom: '1rem',
        }}
      >
        캐릭터 공통 컴포넌트
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          alignSelf: 'center',
          width: '700px',
          height: '200px',
          backgroundColor: 'blue',
          color: '#fafdff',
        }}
      >
        경험치 바
      </Box>
      <GrowthTitle>쑥쑥! 성장기록</GrowthTitle>
      <GrowthStageContainer>
        <Grid container rowSpacing={8} columnSpacing={1}>
          <Grid size={{ xs: 6 }} sx={{ display: 'flex', justifyContent: 'center' }}>
            <UnlockedStage></UnlockedStage>
          </Grid>
          <Grid size={{ xs: 6 }} sx={{ display: 'flex', justifyContent: 'center' }}>
            <UnlockedStage></UnlockedStage>
          </Grid>
          <Grid size={{ xs: 6 }} sx={{ display: 'flex', justifyContent: 'center' }}>
            <UnlockedStage></UnlockedStage>
          </Grid>
          <Grid size={{ xs: 6 }} sx={{ display: 'flex', justifyContent: 'center' }}>
            <LockedStage>?</LockedStage>
          </Grid>
        </Grid>
      </GrowthStageContainer>
    </Container>
  );
};

export default CharacterDetailPage;
