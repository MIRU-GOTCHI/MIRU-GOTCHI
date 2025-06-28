import { doc, updateDoc, increment } from 'firebase/firestore';

import { db } from '../../firebase';

export const completeTodayLog = async (userId: string, goalId: string, logId: string) => {
  const logRef = doc(db, 'users', userId, 'goals', goalId, 'logs', logId);
  const goalRef = doc(db, 'users', userId, 'goals', goalId);

  await updateDoc(logRef, {
    checked: true,
  });

  await updateDoc(goalRef, {
    successCount: increment(1),
  });

};
