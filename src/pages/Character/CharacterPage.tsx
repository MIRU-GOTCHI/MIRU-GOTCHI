import { useAuth } from '@hooks/auth/useAuth';
import { useGetGoals } from '@hooks/useGetGoals';
import ContentInner from '@layout/common/ContentInner';
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
            padding: { sm: '40px 35px', xs: '30px 23px' },
            backgroundColor: '#5B93D5',
            minHeight: '128px',
            borderRadius: '0px 0 16px 16px',
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
  // background: '#F2F2F3',
  padding: '4rem 0',
  [theme.breakpoints.down('lg')]: {
    padding: '2rem 0',
  },
  [theme.breakpoints.down('md')]: {
    padding: '1rem 0',
  },
  '& .tabImgArea': {
    display: 'flex',
    justifyContent: 'center',
  },
  '& .tabImg': {
    position: 'relative',
    backgroundColor: 'white',
    minWidth: '128px',
    minHeight: '128px',
    borderRadius: '12px',
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '& > img': {
      width: '80px',
      height: '80px',
      objectFit: 'contain',
    },
  },
  '@media (min-width:320px) and (max-width:720px)': {
    '& .tabImgArea': {
      width: 'calc(50% - 10px)',
    },
    '& .tabImg': {
      padding: '20px',
      '& > img': {
        width: '100%',
        height: 'auto',
      },
    },
  },
  '@media (max-width:375px)': {
    '& .tabImgArea': {
      width: 'calc(50% - 10px)',
    },
    '& .MuiBox-root': {
      padding: '20px 15px',
    },
  },
}));

const CharacterPageTitle = styled(Typography)({
  justifyContent: 'center',
  // fontSize: '32px !important',
  fontSize: '25px !important',
  // color: '#050505 !important',
  fontWeight: '500',
  // fontFamily: 'Galmuri14 !important',
});

const CharacterPageDescription = styled(Typography)({
  justifyContent: 'center',
  fontSize: '16px !important',
  color: '#a4a4a4 !important',
  // fontFamily: 'Galmuri14!important',
  marginBottom: '2rem !important',
});

const CharacterPageTabArea = styled('div')({
  width: '100%',
  border: 'none',
  outline: 'none',
  boxShadow: 'none',
  backgroundColor: '#ededed',
  borderRadius: '16px 16px 0 0',
});

const CharacterPageTab = styled(Tab)<{ selected?: boolean }>({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: 'fit-content',
  // backgroundColor: '#4B7CB4 !important',
  backgroundColor: '#ededed !important',
  color: '#A4A4A4 !important',
  // fontSize: '20px !important',
  fontSize: '16px !important',
  border: 'none',
  outline: 'none',
  boxShadow: 'none',
  // padding: '16px 32px !important',
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

  const { userId } = useAuth();
  const { data: allGoalData } = useGetGoals(userId ?? '');

  const onGoingGoals = allGoalData
    ? allGoalData.filter((goal) => goal.status === 'in_progress')
    : [];
  const completedGoals = allGoalData
    ? allGoalData.filter((goal) => goal.status === 'completed')
    : [];

  const handleChange = (_e: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <ContentInner>
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
            <CharacterPageTab label="진행중" {...a11yProps(0)} />
            <CharacterPageTab label="완료" {...a11yProps(1)} />
          </Tabs>
        </CharacterPageTabArea>
        <CustomTabPanel value={value} index={0}>
          <Grid container rowSpacing={2} columnSpacing={2}>
            {onGoingGoals?.map((goal) => {
              const charId = goal.characterId;
              const stage = goal.characterStatus.growthStage;
              const image = characterImageMap[charId]?.[stage];

              return (
                <Grid key={goal.id} className="tabImgArea">
                  <Box
                    sx={{ cursor: 'pointer' }}
                    onClick={() => navigate(`/character/${goal.id}`)}
                    className="tabImg"
                  >
                    {image && <img src={image} alt="캐릭터 이미지" />}
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
          <Grid container rowSpacing={2} columnSpacing={2}>
            {completedGoals?.map((goal) => {
              const charId = goal.characterId;
              const stage = goal.characterStatus.growthStage;
              const image = characterImageMap[charId]?.[stage];

              return (
                <Grid key={goal.id} className="tabImgArea">
                  <Box onClick={() => navigate(`/character/${goal.id}`)} className="tabImg">
                    {image && <img src={image} alt="캐릭터 이미지" />}
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
    </ContentInner>
  );
};

export default CharacterPage;
