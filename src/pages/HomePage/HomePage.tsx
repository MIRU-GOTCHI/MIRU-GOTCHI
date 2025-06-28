import CharacterBox from '@common/components/CharacterBox';
import { useAuth } from '@hooks/auth/useAuth';
import { useGetAllCharacters } from '@hooks/useGetAllCharacters';
import { useGetGoals } from '@hooks/useGetGoals';
import { FormGroup } from '@mui/material';
import HomeHabitList from '@pages/HomePage/component/HomeHabitList';
import { completeTodayLog } from '@service/logService';
import { useQueryClient } from '@tanstack/react-query';
import styled from 'styled-components';

const MainContent = styled('div')({
  margin: '-10px -20px 0',
  paddingBottom: '60px',
  // height: "calc(100% + 30px)",
});

const CharacterArea = styled('div')({
  // height: "250px",
  backgroundColor: '#F2F2F3',
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
  const queryClient = useQueryClient();

  const todayDate = new Date();
  const dateFormat = `${todayDate.getMonth() + 1} 월 ${todayDate.getDate()}일`;

  const inProgressGoals = data.filter((data) => data.status === 'in_progress');

  const handleCheck = async (goalId: string, logId?: string) => {
    if (!logId) return;
    await completeTodayLog(userId ?? '', goalId, logId);

    const todayKey = new Date().toISOString().split('T')[0];
    queryClient.invalidateQueries({
      queryKey: ['todayLog', goalId, todayKey, userId],
      exact: true,
    });
  };

  return (
    <MainContent>
      <CharacterArea>
        {data.length > 0 && (
          <CharacterBox
            failCount={data[0].failCount}
            title={data[0].title}
            characterStatus={data[0].characterStatus}
            characterId={data[0].characterId}
            totalDays={data[0].totalDays}
            successCount={data[0].successCount}
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
                <span className="counter">4</span>
                <span className="total">/ {data ? data.length : '0'}</span>
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
