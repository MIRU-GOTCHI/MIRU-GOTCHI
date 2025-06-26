import { getDateDiff } from '@utils/getDateDiff';
import { convertTimestampToDate } from '@utils/timeStampConverter';
import { addDoc, collection, getDocs, orderBy, query, Timestamp } from 'firebase/firestore';

import { db } from '../../firebase';

import type { Log, LogFirestore } from '@models/log';

const convertLogFromFirestore = (data: LogFirestore, id: string): Log => ({
  id,
  goalId: data.goalId,
  date: convertTimestampToDate(data.date),
  checked: data.checked,
  createdAt: convertTimestampToDate(data.createdAt),
});

export const logService = {
  async getGoalLogs(userId: string, goalId: string): Promise<Log[]> {
    const logsRef = collection(db, 'users', userId, 'goals', goalId, 'logs');
    const q = query(logsRef, orderBy('date', 'desc'));
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) =>
      convertLogFromFirestore(doc.data() as LogFirestore, doc.id),
    );
  },

  async addLogForGoal(userId: string, goalId: string, startDate: Date, endDate: Date) {
    const logsRef = collection(db, 'users', userId, 'goals', goalId, 'logs');
    const period = getDateDiff(startDate, endDate);

    for (let i = 0; i < period; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);

      await addDoc(logsRef, {
        goalId,
        date: Timestamp.fromDate(date),
        checked: false,
        createdAt: Timestamp.now(),
      });
    }
  },
};
