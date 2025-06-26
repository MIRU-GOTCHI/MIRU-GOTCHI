import BeforeBtn from '@common/components/BeforeBtn';
import ContentTitle from '@layout/common/ContentTitle';
import { Box, Grid, Typography } from '@mui/material';
import React from 'react';
import styled from 'styled-components';

const Container = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  height: '100%',
  backgroundColor: '#F2F2F3',
  padding: '2rem',
});

const GrowthTitle = styled(Typography)({
  display: 'flex',
  alignContent: 'center',
  paddingInline: '3rem',
  fontSize: '32px !important',
  color: '#050505 !important',
  fontFamily: 'DNFBitBitv2 !important',
  marginBlock: '1rem !important',
});

const GrowthStageContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  width: '700px',
  alignSelf: 'center',
  backgroundColor: 'grey',
  paddingBottom: '2rem',
});

const GrowthStageArea = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '700px',
  alignSelf: 'center',
  backgroundColor: 'grey',
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
          height: '50px',
          backgroundColor: 'blue',
          color: '#fafdff',
          marginBottom: '1rem',
        }}
      >
        경험치 바
      </Box>
      <GrowthStageContainer>
        <GrowthTitle>쑥쑥! 성장기록</GrowthTitle>
        <GrowthStageArea>
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
        </GrowthStageArea>
      </GrowthStageContainer>
    </Container>
  );
};

export default CharacterDetailPage;
