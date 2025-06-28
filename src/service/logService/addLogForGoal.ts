import { getDateDiff } from '@utils/getDateDiff';
import { addDoc, collection, Timestamp } from 'firebase/firestore';

import { db } from '../../firebase';

export const addLogForGoal = async (
  userId: string,
  goalId: string,
  startDate: Date,
  endDate: Date,
) => {
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
};
