import { useAuth } from '@hooks/auth/useAuth';
import { useGetGoals } from '@hooks/useGetGoals';
import { useGetLogs } from '@hooks/useGetLogs';
import { format } from 'date-fns';
import { useState } from 'react';

const TestFetchComponent = () => {
  const { userId } = useAuth();
  const [goalId, setGoalId] = useState('');

  const {
    data: goals = [],
    isLoading: isGoalsLoading,
    error: goalsError,
  } = useGetGoals(userId ?? '');

  const {
    data: logs = [],
    isLoading: isLogsLoading,
    error: logsError,
  } = useGetLogs(userId ?? '', goalId);

  return (
    <div>
      <h2>로그 조회 테스트</h2>

      <div>
        <div>유저 ID: {userId}</div>

        <div>
          {isGoalsLoading && <p>목표 불러오는 중...</p>}
          {goalsError && <p>에러 발생: {String(goalsError)}</p>}

          {!isGoalsLoading && (
            <select value={goalId} onChange={(e) => setGoalId(e.target.value)}>
              <option value="">목표를 선택하세요</option>
              {goals.map((goal) => (
                <option key={goal.id} value={goal.id}>
                  {goal.title}
                </option>
              ))}
            </select>
          )}
        </div>
      </div>

      {isLogsLoading && <p>로그 불러오는 중...</p>}
      {logsError && <p>로그 에러: {String(logsError)}</p>}

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
