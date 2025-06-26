import { collection, query, where, getDocs, Timestamp } from 'firebase/firestore';

import { db } from '../../firebase';

export const getTodayLog = async (userId: string, goalId: string) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const logsRef = collection(db, 'users', userId, 'goals', goalId, 'logs');
  const q = query(logsRef, where('date', '==', Timestamp.fromDate(today)));

  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};
