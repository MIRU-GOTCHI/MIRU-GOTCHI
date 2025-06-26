import { query, where, getDocs, collection, Timestamp, doc, updateDoc } from 'firebase/firestore';

import { db } from '../../firebase';

export const updateFailCount = async (userId: string, goalId: string) => {
  const now = new Date();
  now.setHours(0, 0, 0, 0);

  const logsRef = collection(db, 'users', userId, 'goals', goalId, 'logs');
  const q = query(
    logsRef,
    where('date', '<', Timestamp.fromDate(now)),
    where('checked', '==', false),
  );

  const snapshot = await getDocs(q);
  const failCount = snapshot.docs.length;

  const goalRef = doc(db, 'users', userId, 'goals', goalId);
  await updateDoc(goalRef, { failCount });
};
