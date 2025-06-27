import { useAuthContext } from '@hooks/auth/useAuthContext';
import { useGetAllCharacters } from '@hooks/useGetAllCharacters';
import { useGetGoals } from '@hooks/useGetGoals';
import { Box, Grid, styled, Tab, Tabs, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { characterImageMap } from '../../constants/characterImages';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box
          sx={{
            padding: { sm: '60px 48px', xs: '30px 24px' },
            backgroundColor: '#5B93D5',
            minHeight: '128px',
            borderRadius: '0px 16px 16px 16px',
          }}
        >
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const CharacterPageContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  height: '100%',
  background: '#F2F2F3',
  padding: '4rem',
  [theme.breakpoints.down('lg')]: {
    padding: '2rem',
  },
  [theme.breakpoints.down('md')]: {
    padding: '1rem',
  },
}));

const CharacterPageTitle = styled(Typography)({
  justifyContent: 'center',
  fontSize: '32px !important',
  color: '#050505 !important',
  fontFamily: 'Galmuri14 !important',
});

const CharacterPageDescription = styled(Typography)({
  justifyContent: 'center',
  fontSize: '16px !important',
  color: '#a4a4a4 !important',
  fontFamily: 'Galmuri14!important',
  marginBottom: '2rem !important',
});

const CharacterPageTabArea = styled('div')({
  width: '100%',
  border: 'none',
  outline: 'none',
  boxShadow: 'none',
});

const CharacterPageTab = styled(Tab)<{ selected?: boolean }>({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: 'fit-content',
  backgroundColor: '#4B7CB4 !important',
  color: '#A4A4A4 !important',
  fontSize: '20px !important',
  border: 'none',
  outline: 'none',
  boxShadow: 'none',
  padding: '16px 32px !important',
  fontFamily: 'Galmuri14 !important',
  borderRadius: '16px 16px 0px 0px ',

  '&.Mui-selected': {
    backgroundColor: '#5B93D5 !important',
    color: '#fafdff !important',
  },
  '&:focus': {
    outline: 'none',
  },
  '&:focus-visible': {
    outline: 'none',
  },
});

const CharacterPage = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState(0);

  const { userId } = useAuthContext();
  const { data: allGoalData } = useGetGoals(userId);

  const onGoingGoals = allGoalData?.filter((goal) => !goal.characterStatus.gone);
  const completedGoals = allGoalData?.filter((goal) => goal.characterStatus.gone);

  // console.log('dd', allGoalData);

  const handleChange = (e, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <CharacterPageContainer>
        <CharacterPageTitle>나의 습관 캐릭터 목록</CharacterPageTitle>
        <CharacterPageDescription>
          지금까지 키워온 미루몬들을 한눈에 확인 할 수 있어요!
        </CharacterPageDescription>
        <CharacterPageTabArea>
          <Tabs
            value={value}
            onChange={handleChange}
            variant="standard"
            scrollButtons="auto"
            TabIndicatorProps={{ style: { display: 'none' } }}
          >
            <CharacterPageTab label="진행중" {...a11yProps(0)} sx={{ marginRight: '1rem' }} />
            <CharacterPageTab label="완료" {...a11yProps(1)} />
          </Tabs>
        </CharacterPageTabArea>
        <CustomTabPanel value={value} index={0}>
          <Grid container rowSpacing={4} columnSpacing={1}>
            {onGoingGoals?.map((goal) => {
              const charId = goal.characterId;
              const stage = goal.characterStatus.growthStage;
              const image = characterImageMap[charId]?.[stage];

              return (
                <Grid
                  key={goal.id}
                  size={{ lg: 2, md: 3, sm: 4, xs: 6 }}
                  sx={{ display: 'flex', justifyContent: 'center' }}
                >
                  <Box
                    onClick={() => navigate(`/character/${goal.id}`)}
                    sx={{
                      position: 'relative',
                      backgroundColor: 'white',
                      width: '128px',
                      height: '128px',
                      borderRadius: '12px',
                      overflow: 'hidden',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    {image && (
                      <img
                        src={image}
                        alt="캐릭터 이미지"
                        style={{ width: '80px', height: '80px', objectFit: 'contain' }}
                      />
                    )}
                    <Typography
                      sx={{
                        position: 'absolute',
                        zIndex: 1,
                        top: '0',
                        right: '0',
                        padding: '0.5rem 1rem',
                        color: '#050505',
                        fontWeight: 'bold',
                        fontSize: '1rem',
                        fontFamily: 'DNFBitBitv2 !important',
                        borderBottomLeftRadius: '8px',
                      }}
                    >
                      Lv. {goal.characterStatus.level}
                    </Typography>
                  </Box>
                </Grid>
              );
            })}
          </Grid>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <Grid container rowSpacing={4} columnSpacing={1}>
            {completedGoals?.map((goal) => {
              const charId = goal.characterId;
              const stage = goal.characterStatus.growthStage;
              const image = characterImageMap[charId]?.[stage];

              return (
                <Grid
                  key={goal.id}
                  size={{ lg: 2, md: 3, sm: 4, xs: 6 }}
                  sx={{ display: 'flex', justifyContent: 'center' }}
                >
                  <Box
                    onClick={() => navigate(`/character/${goal.id}`)}
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      position: 'relative',
                      backgroundColor: 'white',
                      width: '128px',
                      height: '128px',
                      borderRadius: '12px',
                      overflow: 'hidden',
                      cursor: 'pointer',
                    }}
                  >
                    {image && (
                      <img
                        src={image}
                        alt="캐릭터 이미지"
                        style={{ width: '80px', height: '80px', objectFit: 'contain' }}
                      />
                    )}
                    <Typography
                      sx={{
                        position: 'absolute',
                        zIndex: 1,
                        top: '0',
                        right: '0',
                        padding: '0.5rem 1rem',
                        color: '#050505',
                        fontWeight: 'bold',
                        fontSize: '1rem',
                        fontFamily: 'DNFBitBitv2 !important',
                        borderBottomLeftRadius: '8px',
                      }}
                    >
                      Lv. {goal.characterStatus.level}
                    </Typography>
                  </Box>
                </Grid>
              );
            })}
          </Grid>
        </CustomTabPanel>
      </CharacterPageContainer>
    </>
  );
};

export default CharacterPage;
