import BeforeBtn from '@common/components/BeforeBtn';
import CharacterBox from '@common/components/CharacterBox';
import { useAuthContext } from '@hooks/auth/useAuthContext';
import { useGetGoal } from '@hooks/useGetGoal';
import ContentTitle from '@layout/common/ContentTitle';
import { Box, Grid, styled, Typography } from '@mui/material';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { characterImageMap } from '../../constants/characterImages';

const Container = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  backgroundColor: '#F2F2F3',
  padding: '2rem',
});

const GrowthTitle = styled(Typography)({
  display: 'flex',
  alignContent: 'center',
  paddingInline: '3rem',
  fontSize: '32px !important',
  color: '#fafdff !important',
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
  backgroundColor: '#5B93D5',
  paddingBottom: '2rem',
});

const GrowthStageArea = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  maxWidth: '720px',
  alignSelf: 'center',
  backgroundColor: '#5B93D5',
});

const UnlockedStage = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
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
  width: '100%',
  maxWidth: '256px',
  minWidth: '64px',
  aspectRatio: '1 / 1',
});

const CharacterDetailPage = () => {
  const navigate = useNavigate();

  const { userId } = useAuthContext();

  const { id } = useParams();
  const { data: goalData } = useGetGoal(userId, id);

  const growthStages = [
    { level: 0, label: '알', key: 'egg' },
    { level: 1, label: '아기', key: 'baby' },
    { level: 2, label: '청소년', key: 'teen' },
    { level: 3, label: '성체', key: 'adult' },
  ];

  const charId = goalData?.characterId;
  const charImages = charId ? characterImageMap[charId] : null;

  console.log('goalData', goalData);

  return (
    <Container>
      <ContentTitle>
        <BeforeBtn />
      </ContentTitle>

      <CharacterBox />
      {/* <Box
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
        character room(추가 예정)
      </Box> */}
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
            {growthStages.map((stage, index) => {
              const isUnlocked = goalData?.characterStatus?.level >= stage.level;

              return (
                <Grid
                  key={stage.key}
                  size={{ xs: 6 }}
                  sx={{ display: 'flex', justifyContent: 'center' }}
                >
                  {isUnlocked ? (
                    <UnlockedStage>
                      {charImages && (
                        <img
                          src={charImages[stage.key]}
                          alt={`${stage.label} 이미지`}
                          style={{ width: '80%', height: '80%', objectFit: 'contain' }}
                        />
                      )}
                    </UnlockedStage>
                  ) : (
                    <LockedStage>
                      <Typography fontFamily="DNFBitBitv2" fontSize={'96px'}>
                        ?
                      </Typography>
                    </LockedStage>
                  )}
                </Grid>
              );
            })}
          </Grid>
        </GrowthStageArea>
      </GrowthStageContainer>
    </Container>
  );
};

export default CharacterDetailPage;
