import { useAuth } from '@hooks/auth/useAuth';
import { updateGoalProgress } from '@service/goalService/updateGoalProgress';
import { completeTodayLog, getTodayLog } from '@service/logService';
import { useState } from 'react';

const TestGoalCheck = () => {
  const { userId } = useAuth();
  const [status, setStatus] = useState('');
  const goalId = 'E3hvMWrzWVyWsohJjYrt';
  const handleCheckLog = async () => {
    try {
      if (userId) {
        setStatus('처리 중...');

        const todayLogs = await getTodayLog(userId, goalId);

        if (todayLogs.length === 0) {
          setStatus('오늘 날짜의 로그가 없습니다.');
          return;
        }

        const log = todayLogs[0];
        console.log(log);

        if (log.checked) {
          setStatus('이미 체크된 로그입니다.');
          return;
        }

        await completeTodayLog(userId, goalId, log.id); // log 체크 + successCount 증가
        await updateGoalProgress(userId, goalId); // failCount 및 characterStatus 업데이트

        setStatus('✔️ 로그 체크 및 캐릭터 상태 업데이트 완료!');
      }
    } catch (error) {
      console.error(error);
      setStatus('❌ 오류 발생: ' + (error as any).message);
    }
  };

  return (
    <div>
      <h2>🧪 테스트: Goal 체크</h2>
      <button onClick={handleCheckLog}>오늘 로그 체크하기</button>
      {status && <p>{status}</p>}
    </div>
  );
};

export default TestGoalCheck;
