import AddNewGoalButton from '@common/components/AddNewGoalButton';
import CustomSwitch from '@common/components/CustomSwitch';
import Loading from '@common/components/Loading';
import { useAuth } from '@hooks/auth/useAuth';
import { useCompleteTodayLog } from '@hooks/useCompleteTodayLog';
import { useGetAllCharacters } from '@hooks/useGetAllCharacters';
import { useGetGoals } from '@hooks/useGetGoals';
import { Box, Typography, Tabs, Tab } from '@mui/material';
import { styled as muiStyled } from '@mui/material/styles';
import HabitList from '@pages/HabitPage/components/HabitList';
import { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  padding: 16px;
  @media (max-width: 600px) {
    padding: 0px;
  }
`;

const TitleContainer = muiStyled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'start',
  justifyContent: 'space-between',
  marginBottom: 30,
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1, 1.5),
    gap: theme.spacing(1),
    marginBottom: 0,
  },
}));

const SwitchContainer = muiStyled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'end',
  gap: 4,
}));

const HabitListPage = () => {
  const { userId } = useAuth();
  const [showInProgress, setShowInProgress] = useState(true);
  const [doneTab, setDoneTab] = useState<'completed' | 'failed'>('completed');

  const { data: goals = [], isLoading: isGoalLoading } = useGetGoals(userId ?? '');
  const { data: characters = [], isLoading: isCharactersLoading } = useGetAllCharacters();
  const completeTodayLogMutation = useCompleteTodayLog();

  const handleSwitchChange = () => setShowInProgress((prev) => !prev);

  const handleCheck = async (goalId: string, logId?: string) => {
    if (!logId || !userId) return;

    try {
      await completeTodayLogMutation.mutateAsync({
        userId,
        goalId,
        logId,
      });
    } catch (error) {
      console.error('Failed to complete today log:', error);
    }
  };

  const filteredGoals = goals.filter((goal) => {
    if (showInProgress) return goal.status === 'in_progress';
    return goal.status === doneTab;
  });

  if (isGoalLoading || isCharactersLoading) return <Loading />;

  return (
    <Container>
      <TitleContainer>
        <Typography
          sx={{
            fontSize: {
              xs: '2.2rem',
              sm: '2.8rem',
              md: '2.9rem',
            },
            lineHeight: {
              xs: '2',
              sm: '1.6',
            },
          }}
          variant="h4"
        >
          나의 습관 리스트
        </Typography>

        <SwitchContainer>
          <Typography>{showInProgress ? '진행 중 목표' : '완료 목표'}</Typography>
          <CustomSwitch checked={showInProgress} onChange={handleSwitchChange} />
        </SwitchContainer>
      </TitleContainer>

      {!showInProgress && (
        <Tabs
          value={doneTab}
          onChange={(_, newValue) => setDoneTab(newValue)}
          sx={{
            mb: 2,
          }}
        >
          <Tab value="completed" label="완료된 목표" />
          <Tab value="failed" label="실패한 목표" />
        </Tabs>
      )}

      {filteredGoals.length === 0 ? (
        <Box sx={{ minHeight: '40vh' }}>
          <Typography sx={{ lineHeight: 40, textAlign: 'center' }}>습관이 없습니다</Typography>
        </Box>
      ) : (
        <HabitList goals={filteredGoals} characters={characters} onCheck={handleCheck} />
      )}

      <AddNewGoalButton />
    </Container>
  );
};

export default HabitListPage;
