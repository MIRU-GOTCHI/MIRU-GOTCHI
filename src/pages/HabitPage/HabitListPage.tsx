import AddNewGoalButton from '@common/components/AddNewGoalButton';
import Loading from '@common/components/Loading';
import { useAuth } from '@hooks/auth/useAuth';
import { useGetAllCharacters } from '@hooks/useGetAllCharacters';
import { Box, Switch, Typography } from '@mui/material';
import HabitList from '@pages/HabitPage/components/HabitList';
import { getGoalsList } from '@service/goalService';
import { completeTodayLog, getTodayLog } from '@service/logService';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

import type { Goal } from '@models/goal';
import type { Log } from '@models/log';

const Container = styled.div`
  padding: 16px;

  @media (max-width: 600px) {
    padding: 0px;
  }
`;
const HabitListPage = () => {
  const { userId } = useAuth();
  const [goals, setGoals] = useState<Goal[]>([]);
  const [showInProgress, setShowInProgress] = useState(true);
  const [logs, setLogs] = useState<Record<string, Log | null>>({});

  const [isGoalLoading, setIsGoalLoading] = useState(true);

  const { data: characters = [], isLoading: isCharactersLoading } = useGetAllCharacters();

  useEffect(() => {
    const fetchGoals = async () => {
      if (!userId) return;
      const goalList = await getGoalsList(userId);
      setGoals(goalList);

      const logsMap: Record<string, Log | null> = {};
      for (const goal of goalList) {
        if (goal.status === 'in_progress') {
          const todayLogs = await getTodayLog(userId, goal.id);
          logsMap[goal.id] = todayLogs[0] || null;
        }
      }

      setLogs(logsMap);
      setIsGoalLoading(false);
    };

    fetchGoals();
  }, [userId]);

  const handleSwitchChange = () => {
    setShowInProgress((prev) => !prev);
  };

  const handleCheck = async (goalId: string, logId?: string) => {
    if (!logId) return;
    await completeTodayLog(userId ?? '', goalId, logId);
    setLogs((prev) => ({
      ...prev,
      [goalId]: prev[goalId] ? { ...prev[goalId]!, checked: true } : null,
    }));
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
        <HabitList
          goals={filteredGoals}
          logs={logs}
          characters={characters}
          onCheck={handleCheck}
        />
      )}{' '}
      <AddNewGoalButton />
    </Container>
  );
};

export default HabitListPage;
