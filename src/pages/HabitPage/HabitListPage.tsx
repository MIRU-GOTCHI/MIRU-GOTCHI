import AddNewGoalButton from '@common/components/AddNewGoalButton';
import Loading from '@common/components/Loading';
import { useAuth } from '@hooks/auth/useAuth';
import { useGetAllCharacters } from '@hooks/useGetAllCharacters';
import { useGetGoals } from '@hooks/useGetGoals';
import { Box, Switch, Typography } from '@mui/material';
import HabitList from '@pages/HabitPage/components/HabitList';
import { completeTodayLog } from '@service/logService';
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  padding: 16px;

  @media (max-width: 600px) {
    padding: 0px;
  }
`;

const HabitListPage = () => {
  const { userId } = useAuth();
  const [showInProgress, setShowInProgress] = useState(true);
  const queryClient = useQueryClient();

  const { data: goals = [], isLoading: isGoalLoading } = useGetGoals(userId ?? '');
  const { data: characters = [], isLoading: isCharactersLoading } = useGetAllCharacters();

  const handleSwitchChange = () => setShowInProgress((prev) => !prev);

  const handleCheck = async (goalId: string, logId?: string) => {
    if (!logId) return;
    await completeTodayLog(userId ?? '', goalId, logId);

    const todayKey = new Date().toISOString().split('T')[0];
    queryClient.invalidateQueries({
      queryKey: ['todayLog', goalId, todayKey, userId],
      exact: true,
    });
  };

  const filteredGoals = goals.filter((goal) =>
    showInProgress ? goal.status === 'in_progress' : goal.status !== 'in_progress',
  );

  if (isGoalLoading || isCharactersLoading) return <Loading />;

  return (
    <Container>
      <Typography variant="h4">나의 습관 리스트</Typography>
      <Box display="flex" alignItems="center" mb={2}>
        <Typography>진행중만 보기</Typography>
        <Switch checked={showInProgress} onChange={handleSwitchChange} />
      </Box>
      {filteredGoals.length === 0 ? (
        <Typography>습관이 없습니다</Typography>
      ) : (
        <HabitList goals={filteredGoals} characters={characters} onCheck={handleCheck} />
      )}
      <AddNewGoalButton />
    </Container>
  );
};

export default HabitListPage;
