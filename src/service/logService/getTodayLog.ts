import { convertTimestampToDate } from '@utils/timeStampConverter';
import { collection, query, where, getDocs, Timestamp } from 'firebase/firestore';

import { db } from '../../firebase';

import type { Log, LogFirestore } from '@models/log';

export const getTodayLog = async (userId: string, goalId: string): Promise<Log | null> => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const start = Timestamp.fromDate(today);

  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const end = Timestamp.fromDate(tomorrow);

  const logsRef = collection(db, 'users', userId, 'goals', goalId, 'logs');
  const q = query(logsRef, where('date', '>=', start), where('date', '<', end));

  const snapshot = await getDocs(q);

  if (snapshot.empty) {
    return null;
  }

  const doc = snapshot.docs[0];
  const data = doc.data() as LogFirestore;

  const log: Log = {
    id: doc.id,
    goalId: data.goalId,
    date: convertTimestampToDate(data.date),
    checked: data.checked,
    createdAt: convertTimestampToDate(data.createdAt),
  };

  return log;
};
