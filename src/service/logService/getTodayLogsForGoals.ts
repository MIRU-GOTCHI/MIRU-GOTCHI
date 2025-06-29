import { getGoalsList } from '@service/goalService';
import { getTodayLog } from '@service/logService/getTodayLog';

import type { Log } from '@models/log';

export const getAllTodayLogs = async (userId: string) => {
  const goals = await getGoalsList(userId);
  const goalIds = goals.map((goal) => goal.id);

  const results = await Promise.all(
    goalIds.map((goalId) => getTodayLog(userId, goalId).then((log) => ({ goalId, log }))),
  );
  return results.reduce(
    (acc, { goalId, log }) => {
      acc[goalId] = log;
      return acc;
    },
    {} as Record<string, Log | null>,
  );
};
