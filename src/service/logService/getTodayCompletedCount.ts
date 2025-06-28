import { collection, getDocs, query, Timestamp, where } from 'firebase/firestore';

import { db } from '../../firebase';

export const getTodayCompletedCount = async (
  userId: string,
  goalIds: string[],
): Promise<number> => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const start = Timestamp.fromDate(today);

  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const end = Timestamp.fromDate(tomorrow);

  let completedCount = 0;

  for (const goalId of goalIds) {
    const logsRef = collection(db, 'users', userId, 'goals', goalId, 'logs');
    const q = query(
      logsRef,
      where('date', '>=', start),
      where('date', '<', end),
      where('checked', '==', true),
    );

    const snapshot = await getDocs(q);
    if (!snapshot.empty) {
      completedCount++;
    }
  }

  return completedCount;
};
