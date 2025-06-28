import BeforeBtn from '@common/components/BeforeBtn';
import CharacterBox from '@common/components/CharacterBox';
import { useAuthContext } from '@hooks/auth/useAuthContext';
import { useGetGoal } from '@hooks/useGetGoal';
import ContentTitle from '@layout/common/ContentTitle';
import { Grid, styled, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

import stageLocked from '../../assets/images/lockedStage.png';
import { characterImageMap } from '../../constants/characterImages';

type CharacterStage = 'egg' | 'baby' | 'teen' | 'adult';

type CharacterImageSet = {
  [key in CharacterStage]: string;
};

const Container = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  backgroundColor: '#F2F2F3',
  padding: '0rem 2rem 6rem 2rem',
});

const GrowthTitle = styled(Typography)({
  display: 'flex',
  alignContent: 'center',
  marginBottom: '2rem',
  paddingInline: '1rem',
  fontSize: '32px !important',
  color: '#fafdff !important',
  fontFamily: 'DNFBitBitv2 !important',
  marginBlock: '1rem !important',
});

const GrowthStageContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  paddingInline: '2rem',
  width: '100%',
  maxWidth: '460px',
  alignSelf: 'center',
  backgroundColor: '#5B93D5',
  paddingBottom: '2rem',
  borderRadius: '16px',
});

const GrowthStageArea = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  maxWidth: '460px',
  alignSelf: 'center',
  backgroundColor: '#5B93D5',
});

const StageLevelText = styled(Typography)(({ theme }) => ({
  position: 'absolute',
  fontFamily: 'DNFBitBitv2',
  fontSize: '16px',
  top: '0.5rem',
  left: '1rem',
  letterSpacing: '-0.5px',
  [theme.breakpoints.down('sm')]: {
    top: '0.25rem',
    left: '0.6rem',
    fontSize: '0.825rem',
  },
}));

const LockedStageImg = styled('img')({
  position: 'absolute',
  fontFamily: 'DNFBitBitv2',
  bottom: '10%',
  width: '70%',
  height: '70%',
  objectFit: 'contain',
});
const UnlockedStage = styled('div')({
  position: 'relative',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'white',
  width: '100%',
  maxWidth: '160px',
  minWidth: '64px',
  aspectRatio: '1 / 1',
  borderRadius: '12px',
});

const LockedStage = styled('div')({
  position: 'relative',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'white',
  fontSize: '32px',
  color: '#050505',
  width: '100%',
  maxWidth: '160px',
  minWidth: '64px',
  aspectRatio: '1 / 1',
  borderRadius: '12px',
});

const BeforeBtnWrapper = styled('div')({});

const CharacterDetailPage = () => {
  const navigate = useNavigate();
  const { userId } = useAuthContext();

  const { id } = useParams();
  const { data: goalData } = useGetGoal(userId ?? '', id ?? '');

  const growthStages: { level: number; label: string; key: keyof CharacterImageSet }[] = [
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
        <BeforeBtnWrapper onClick={() => navigate(`/character`)}>
          <BeforeBtn />
        </BeforeBtnWrapper>
      </ContentTitle>

      {goalData && (
        <CharacterBox
          failCount={goalData.failCount}
          title={goalData.title}
          characterStatus={goalData.characterStatus}
          characterId={goalData.characterId}
          totalDays={goalData.totalDays}
          successCount={goalData.successCount}
          bubbleTalk="습관은 습관으로 극복할 수 있다."
        />
      )}

      <GrowthStageContainer>
        <GrowthTitle>쑥쑥! 성장기록</GrowthTitle>
        <GrowthStageArea>
          <Grid container rowSpacing={4} columnSpacing={1} sx={{ width: '100%' }}>
            {growthStages.map((stage) => {
              const isUnlocked =
                goalData?.characterStatus?.level !== undefined &&
                goalData?.characterStatus?.level >= stage.level;

              return (
                <Grid
                  key={stage.key}
                  size={{ xs: 6 }}
                  sx={{ display: 'flex', justifyContent: 'center' }}
                >
                  {isUnlocked ? (
                    <UnlockedStage>
                      <StageLevelText>Lv. {stage.level}</StageLevelText>
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
                      <StageLevelText>Lv. {stage.level}</StageLevelText>
                      <LockedStageImg src={stageLocked} />
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
