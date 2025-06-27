import BeforeBtn from '@common/components/BeforeBtn';
import ContentTitle from '@layout/common/ContentTitle';
import { Box, Grid, styled, Typography } from '@mui/material';
import React from 'react';

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
  width: '100%',
  maxWidth: '720px',
  alignSelf: 'center',
  backgroundColor: 'grey',
  paddingBottom: '2rem',
});

const GrowthStageArea = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  maxWidth: '720px',
  alignSelf: 'center',
  backgroundColor: 'grey',
});

const UnlockedStage = styled('div')({
  backgroundColor: 'white',
  width: '100%',
  maxWidth: '256px',
  minWidth: '64px',
  aspectRatio: '1 / 1',
});

const LockedStage = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: '32px',
  color: '#fafdff',
  backgroundColor: 'black',
  width: '100%',
  maxWidth: '256px',
  minWidth: '64px',
  aspectRatio: '1 / 1',
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
          color: '#fafdff',
          backgroundColor: 'blue',
          width: '100%',
          maxWidth: '720px',
          aspectRatio: '1/1',
          marginBottom: '1rem',
        }}
      >
        character room
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          alignSelf: 'center',
          width: '100%',
          maxWidth: '720px',
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
          <Grid container rowSpacing={8} columnSpacing={1} sx={{ width: '100%' }}>
            <Grid size={{ xs: 6 }} sx={{ display: 'flex', justifyContent: 'center' }}>
              <UnlockedStage>1</UnlockedStage>
            </Grid>
            <Grid size={{ xs: 6 }} sx={{ display: 'flex', justifyContent: 'center' }}>
              <UnlockedStage>2</UnlockedStage>
            </Grid>
            <Grid size={{ xs: 6 }} sx={{ display: 'flex', justifyContent: 'center' }}>
              <UnlockedStage>3</UnlockedStage>
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
