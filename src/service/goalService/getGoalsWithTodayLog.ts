import { collection, getDocs, query, where, Timestamp } from 'firebase/firestore';

import { db } from '../../firebase';

export const getGoalsWithTodayLog = async (userId: string) => {
  const goalsRef = collection(db, 'users', userId, 'goals');
  const goalsSnapshot = await getDocs(goalsRef);

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayTs = Timestamp.fromDate(today);

  const result = [];

  for (const goalDoc of goalsSnapshot.docs) {
    const goalId = goalDoc.id;
    const logsRef = collection(db, 'users', userId, 'goals', goalId, 'logs');
    const logQuery = query(logsRef, where('date', '==', todayTs));
    const logSnapshot = await getDocs(logQuery);

    if (!logSnapshot.empty) {
      result.push({
        id: goalId,
        ...goalDoc.data(),
      });
    }
  }

  return result;
};
