import { collection, query, where, getDocs, Timestamp } from 'firebase/firestore';
import { db } from '../../firebase';
import { convertTimestampToDate } from '@utils/timeStampConverter';
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

  if (!snapshot.empty) {
    const docSnap = snapshot.docs[0];
    const logData = docSnap.data() as LogFirestore;
    return {
      id: docSnap.id,
      checked: logData.checked,
      createdAt: convertTimestampToDate(logData.createdAt),
      date: convertTimestampToDate(logData.date),
      goalId: logData.goalId,
    };
  } else {
    return null;
  }
};
