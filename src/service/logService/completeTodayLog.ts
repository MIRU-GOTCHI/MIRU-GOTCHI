import { doc, updateDoc, increment, collection, query, getDocs } from 'firebase/firestore';

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
export const recalculateGoalSuccessCount = async (userId: string, goalId: string) => {
  const logsRef = collection(db, 'users', userId, 'goals', goalId, 'logs');
  const q = query(logsRef); 
  const snapshot = await getDocs(q);

  let checkedLogsCount = 0;
  snapshot.forEach(docSnap => {
    const logData = docSnap.data();
    if (logData.checked === true) {
      checkedLogsCount++;
    }
  });

  const goalRef = doc(db, 'users', userId, 'goals', goalId);
  await updateDoc(goalRef, {
    successCount: checkedLogsCount,
  });
};
