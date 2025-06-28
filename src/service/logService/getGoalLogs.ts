import { convertTimestampToDate } from '@utils/timeStampConverter';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';

import { db } from '../../firebase';

import type { Log, LogFirestore } from '@models/log';

const convertLogFromFirestore = (data: LogFirestore, id: string): Log => ({
  id,
  goalId: data.goalId,
  date: convertTimestampToDate(data.date),
  checked: data.checked,
  createdAt: convertTimestampToDate(data.createdAt),
});

export const getGoalLogs = async (userId: string, goalId: string): Promise<Log[]> => {
  const logsRef = collection(db, 'users', userId, 'goals', goalId, 'logs');
  const q = query(logsRef, orderBy('date', 'desc'));
  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map((doc) =>
    convertLogFromFirestore(doc.data() as LogFirestore, doc.id),
  );
};
