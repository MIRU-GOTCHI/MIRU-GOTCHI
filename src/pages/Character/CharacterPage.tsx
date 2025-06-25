import { Box, Tab, Tabs, Typography } from '@mui/material';
import React, { useState } from 'react';
import styled from 'styled-components';

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
            p: 3,
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
  width: '100vw',
  height: '100vh',
  background: '#F2F2F3',
});

const CharacterPageTitle = styled(Typography)({
  justifyContent: 'center',
  fontSize: '32px',
  fontWeight: '900',
  color: '#050505',
});

const CharacterPageTabArea = styled('div')({
  width: '100%',
  border: 'none',
  outline: 'none',
  boxShadow: 'none',
});

const CharacterPageTab = styled(Tab)<{ selected?: boolean }>({
  backgroundColor: '#4B7CB4',
  color: '#A4A4A4',
  fontWeight: 'bold',
  border: 'none',
  outline: 'none',
  boxShadow: 'none',
  '&.Mui-selected': {
    backgroundColor: '#5B93D5',
    color: '#fafdff',
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

  const handleChange = (e, newValue: number) => {
    setValue(newValue);
  };

  return (
    <CharacterPageContainer>
      <CharacterPageTitle>나의 습관 캐릭터 목록</CharacterPageTitle>
      <CharacterPageTabArea>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="fullWidth"
          TabIndicatorProps={{ style: { display: 'none' } }}
        >
          <CharacterPageTab label="진행중" {...a11yProps(0)}></CharacterPageTab>
          <CharacterPageTab label="완료" {...a11yProps(1)}></CharacterPageTab>
        </Tabs>
      </CharacterPageTabArea>
      <CustomTabPanel value={value} index={0}>
        Item One
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        Item Two
      </CustomTabPanel>
    </CharacterPageContainer>
  );
};

export default CharacterPage;
