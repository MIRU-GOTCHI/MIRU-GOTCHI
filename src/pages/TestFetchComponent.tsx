import { useAuth } from '@hooks/useAuth';
import { goalService } from '@service/goalService/goalService';
import { logService } from '@service/logService/logService';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';

import type { Goal } from '@models/goal';
import type { Log } from '@models/log';

const TestFetchComponent = () => {
  const { userId } = useAuth();
  const [goalId, setGoalId] = useState('');
  const [goals, setGoals] = useState<Goal[]>([]);
  const [logs, setLogs] = useState<Log[]>([]);

  useEffect(() => {
    const fetchGoals = async () => {
      if (!userId) return;
      try {
        const fetchedGoals = await goalService.getUserGoals(userId);
        setGoals(fetchedGoals);
      } catch (error) {
        console.error(error);
      }
    };

    fetchGoals();
  }, [userId]);

  const handleFetchLogs = async () => {
    if (!userId || !goalId) return;

    try {
      const fetchedLogs = await logService.getGoalLogs(userId, goalId);
      setLogs(fetchedLogs);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>로그 조회 테스트</h2>

      <div>
        <div>유저 ID: {userId}</div>

        <div>
          <select value={goalId} onChange={(e) => setGoalId(e.target.value)}>
            {goals.map((goal) => (
              <option key={goal.id} value={goal.id}>
                {goal.title}
              </option>
            ))}
          </select>
        </div>

        <button onClick={handleFetchLogs}>로그 불러오기</button>
      </div>

      {logs.length > 0 && (
        <div>
          <h3>로그 목록</h3>
          {logs.map((log, index) => (
            <div key={log.id}>
              <p>{index + 1}번</p>
              <p>날짜: {format(log.date, 'yyyy-MM-dd')}</p>
              <p>완료됨: {log.checked.toString()}</p>
              <p>생성일: {format(log.createdAt, 'yyyy-MM-dd HH:mm')}</p>
              <p>Log 문서 ID: {log.id}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TestFetchComponent;
