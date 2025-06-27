import { Box, Grid, styled, Tab, Tabs, Typography } from '@mui/material';
import { useState } from 'react';

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
            padding: '60px 48px',
            backgroundColor: '#5B93D5',
            minHeight: '300px',
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

const CharacterPageContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  height: '100%',
  background: '#F2F2F3',
  padding: '4rem',
});

const CharacterPageTitle = styled(Typography)({
  justifyContent: 'center',
  fontSize: '32px !important',
  color: '#050505 !important',
  // fontFamily: 'Galmuri14, sans-serif !important',
});

const CharacterPageDescription = styled(Typography)({
  justifyContent: 'center',
  fontSize: '16px !important',
  color: '#a4a4a4 !important',
  // fontFamily: 'Galmuri14, sans-serif !important',
  marginBottom: '2rem !important',
});

const CharacterPageTabArea = styled('div')({
  width: '100%',
  border: 'none',
  outline: 'none',
  boxShadow: 'none',
});

const CharacterPageTab = styled(Tab)<{ selected?: boolean }>({
  width: 'fit-content',
  backgroundColor: '#4B7CB4 !important',
  color: '#A4A4A4 !important',
  fontSize: '20px !important',
  border: 'none',
  outline: 'none',
  boxShadow: 'none',
  padding: '16px 32px !important',
  // fontFamily: 'Galmuri14, sans-serif !important',
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
  const [value, setValue] = useState(0);

  const handleChange = (_e: any, newValue: number) => {
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
            {[...Array(12)].map((_, index) => (
              <Grid
                size={{ xs: 2.4 }}
                key={index}
                sx={{ display: 'flex', justifyContent: 'center' }}
              >
                <Box
                  sx={{
                    position: 'relative',
                    backgroundColor: 'white',
                    width: '128px',
                    height: '128px',
                  }}
                >
                  <Typography
                    sx={{
                      position: 'absolute',
                      zIndex: 1,
                      top: '0',
                      right: '0',
                      padding: '0.5rem 1rem',
                    }}
                  >
                    Lv.1
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <Grid container rowSpacing={4} columnSpacing={1}>
            {[...Array(7)].map((_, index) => (
              <Grid
                size={{ xs: 2.4 }}
                key={index}
                sx={{ display: 'flex', justifyContent: 'center' }}
              >
                <Box
                  sx={{
                    position: 'relative',
                    backgroundColor: 'white',
                    width: '128px',
                    height: '128px',
                  }}
                >
                  <Typography
                    sx={{
                      position: 'absolute',
                      zIndex: 1,
                      top: '0',
                      right: '0',
                      padding: '0.5rem 1rem',
                    }}
                  >
                    Lv.1
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </CustomTabPanel>
      </CharacterPageContainer>
    </>
  );
};

export default CharacterPage;
