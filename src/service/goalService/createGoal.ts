import { addLogForGoal } from '@service/logService';
import { addDoc, collection, Timestamp } from 'firebase/firestore';

import { db } from '../../firebase';

import type { CreateGoalData } from '@models/goal';

export const createGoal = async (userId: string, goalData: CreateGoalData) => {
  const goalsRef = collection(db, 'users', userId, 'goals');
  const now = Timestamp.now();

  const start = new Date(goalData.startDate);
  start.setHours(0, 0, 0, 0);

  const end = new Date(goalData.endDate);
  end.setHours(23, 59, 59, 999);

  const totalDays = Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));

  const docRef = await addDoc(goalsRef, {
    ...goalData,
    userId,
    startDate: Timestamp.fromDate(start),
    endDate: Timestamp.fromDate(end),
    characterStatus: {
      ...goalData.characterStatus,
    },
    totalDays,
    createdAt: now,
    updatedAt: now,
    status: 'in_progress',
  });

  await addLogForGoal(userId, docRef.id, start, end);

  return docRef.id;
};
