import { convertGoalDate } from '@service/goalService/converter';
import { collection, getDocs, query, where, Timestamp } from 'firebase/firestore';

import { db } from '../../firebase';

import type { Goal, GoalFirestore } from '@models/goal';

export const getGoalsWithTodayLog = async (userId: string): Promise<Goal[]> => {
  const goalsRef = collection(db, 'users', userId, 'goals');
  const goalsSnapshot = await getDocs(goalsRef);

  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);
  const endOfDay = new Date();
  endOfDay.setHours(23, 59, 59, 999);

  const startTimestamp = Timestamp.fromDate(startOfDay);
  const endTimestamp = Timestamp.fromDate(endOfDay);

  const result: Goal[] = [];

  for (const goalDoc of goalsSnapshot.docs) {
    const goalId = goalDoc.id;
    const goalData = goalDoc.data() as GoalFirestore;

    const logsRef = collection(db, 'users', userId, 'goals', goalId, 'logs');
    const logQuery = query(
      logsRef,
      where('date', '>=', startTimestamp),
      where('date', '<=', endTimestamp),
    );
    const logSnapshot = await getDocs(logQuery);

    if (!logSnapshot.empty) {
      const goal = convertGoalDate(goalData, goalId);
      result.push(goal);
    }
  }

  return result;
};
