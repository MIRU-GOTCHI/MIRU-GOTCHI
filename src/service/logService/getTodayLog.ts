import { collection, query, where, getDocs, Timestamp } from 'firebase/firestore';

import { db } from '../../firebase';

export const getTodayLog = async (userId: string, goalId: string) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const start = Timestamp.fromDate(today);

  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const end = Timestamp.fromDate(tomorrow);

  const logsRef = collection(db, 'users', userId, 'goals', goalId, 'logs');
  const q = query(logsRef, where('date', '>=', start), where('date', '<', end));

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as any),
  }));
};
