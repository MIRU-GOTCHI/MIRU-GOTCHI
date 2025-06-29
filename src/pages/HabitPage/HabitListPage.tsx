import CustomSwitch from '@common/components/CustomSwitch';
import Loading from '@common/components/Loading';
import { useAuth } from '@hooks/auth/useAuth';
import { useCompleteTodayLog } from '@hooks/useCompleteTodayLog';
import { useGetAllCharacters } from '@hooks/useGetAllCharacters';
import { useGetGoals } from '@hooks/useGetGoals';
import { Box, Typography, Tabs, Tab } from '@mui/material';
import { styled as muiStyled } from '@mui/material/styles';
import HabitList from '@pages/HabitPage/components/HabitList';
import { useState, useMemo } from 'react';
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
  const {
    data: goals = [],
    isLoading: isGoalLoading,
    error: goalError,
  } = useGetGoals(userId ?? '');
  const {
    data: characters = [],
    isLoading: isCharactersLoading,
    error: charactersError,
  } = useGetAllCharacters();
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

  const filteredGoals = useMemo(() => {
    return goals.filter((goal) => {
      if (showInProgress) return goal.status === 'in_progress';
      return goal.status === doneTab;
    });
  }, [goals, showInProgress, doneTab]);

  if (!userId) {
    return <Loading />;
  }

  const isLoading = isGoalLoading || isCharactersLoading;

  if (goalError || charactersError) {
    return (
      <Container>
        <Typography color="error">데이터 불러오는 중 오류가 발생했습니다.</Typography>
      </Container>
    );
  }

  if (isLoading) {
    return <Loading />;
  }
  return (
    <Container>
      <TitleContainer>
        <Box>
          <Typography variant="h4" fontWeight="bold">
            나의 습관 리스트
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {showInProgress ? '진행 중 목표' : '완료 목표'}
          </Typography>
        </Box>
        <SwitchContainer>
          <CustomSwitch checked={showInProgress} onChange={handleSwitchChange} />
          {/* <AddNewGoalButton /> */}
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
          <Tab label="완료" value="completed" />
          <Tab label="실패" value="failed" />
        </Tabs>
      )}

      {filteredGoals.length === 0 ? (
        <Box textAlign="center" py={4}>
          <Typography variant="body1" color="text.secondary">
            습관이 없습니다
          </Typography>
        </Box>
      ) : (
        <HabitList goals={filteredGoals} characters={characters} onCheck={handleCheck} />
      )}
    </Container>
  );
};

export default HabitListPage;
