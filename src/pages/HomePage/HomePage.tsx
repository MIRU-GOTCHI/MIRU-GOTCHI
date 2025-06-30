import CharacterBox from '@common/components/CharacterBox';
import { useAuth } from '@hooks/auth/useAuth';
import { useCompleteTodayLog } from '@hooks/useCompleteTodayLog';
import { useGetAllCharacters } from '@hooks/useGetAllCharacters';
import { useGetGoals } from '@hooks/useGetGoals';
import { FormGroup } from '@mui/material';
import HomeHabitList from '@pages/HomePage/component/HomeHabitList';
import { getTodayCompletedCount } from '@service/logService/getTodayCompletedCount';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

const MainContent = styled('div')({
  margin: '-10px -20px 0',
  paddingBottom: '60px',
  // height: "calc(100% + 30px)",
  '@media (min-width: 1280px)': { marginTop: 0 },
});

const CharacterArea = styled('div')({
  // height: "250px",
  backgroundColor: '#F2F2F3',
  '@media (min-width: 1000px)': { padding: '40px 0 25px' },
});

const CustomBox = styled('div')({
  // height: "calc(100% - 250px)",
  padding: '20px 20px 0',
});

const CustomHead = styled('div')({
  display: 'flex',
  marginBottom: '15px',
  justifyContent: 'space-between',
  '.today': {
    color: '#5B93D5',
    fontWeight: 600,
    fontSize: '16px',
  },
  '& .totalCounter': {
    fontSize: '11px',
    color: '#898989',
    '.counter': {
      marginLeft: '5px',
      color: '#5B93D5',
      fontWeight: 600,
      fontSize: '16px',
    },
    '& .total': {
      marginLeft: '5px',
      fontWeight: 600,
    },
  },
  '& .left, .right': {},
});

const CustomList = styled('div')({
  // height: "calc(100% - 37px)",
  // overflowY: "auto",
  '& > div': {
    marginBottom: '10px',
  },
});

const HomePage = () => {
  const { userId } = useAuth();
  const { data = [] } = useGetGoals(userId ?? '');
  const { data: characters = [] } = useGetAllCharacters();
  const [completedCount, setCompletedCount] = useState(0);
  const [randomNum, setRandomNum] = useState(0);

  const completeTodayLogMutation = useCompleteTodayLog();

  const todayDate = new Date();
  const dateFormat = `${todayDate.getMonth() + 1} 월 ${todayDate.getDate()}일`;

  const inProgressGoals = data.filter((data) => data.status === 'in_progress');

  const fetchCompletedCount = async () => {
    if (!userId || data.length === 0) return;

    const goalIds = data.map((goal) => goal.id);
    try {
      const count = await getTodayCompletedCount(userId, goalIds);
      setCompletedCount(count);
    } catch (error) {
      console.error('Failed to fetch completed count:', error);
    }
  };

  const getRandomNum = (num: number) => {
    if (!userId || data.length === 0) return;
    return setRandomNum(Math.floor(Math.random() * num));
  };

  useEffect(() => {
    if (userId && inProgressGoals.length > 0 && randomNum === 0) {
      fetchCompletedCount();
      getRandomNum(inProgressGoals.length);
    }
  }, [userId, inProgressGoals]);

  const handleCheck = async (goalId: string, logId?: string) => {
    if (!logId || !userId) return;

    try {
      await completeTodayLogMutation.mutateAsync({
        userId,
        goalId,
        logId,
      });

      fetchCompletedCount();
    } catch (error) {
      console.error('Failed to complete today log:', error);
    }
  };

  return (
    <MainContent>
      <CharacterArea>
        {inProgressGoals.length > 0 && (
          <CharacterBox
            failCount={inProgressGoals[randomNum].failCount}
            title={inProgressGoals[randomNum].title}
            characterStatus={inProgressGoals[randomNum].characterStatus}
            characterId={inProgressGoals[randomNum].characterId}
            totalDays={inProgressGoals[randomNum].totalDays}
            successCount={inProgressGoals[randomNum].successCount}
            bubbleTalk="습관은 습관으로 극복할 수 있다."
          />
        )}
      </CharacterArea>
      <FormGroup>
        <CustomBox>
          <CustomHead>
            <div className="left">
              <span className="today">{dateFormat}</span>
            </div>
            <div className="right">
              <p className="totalCounter">
                <span>완료 : </span>
                <span className="counter">{completedCount}</span>
                <span className="total">
                  / {inProgressGoals.length > 0 ? inProgressGoals.length : '0'}
                </span>
              </p>
            </div>
          </CustomHead>
          <CustomList>
            <HomeHabitList goals={inProgressGoals} characters={characters} onCheck={handleCheck} />
          </CustomList>
        </CustomBox>
      </FormGroup>
    </MainContent>
  );
};

export default HomePage;
