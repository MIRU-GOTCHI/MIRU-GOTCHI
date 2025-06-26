import { addLogForGoal } from '@service/logService';
import { addDoc, collection, Timestamp } from 'firebase/firestore';

import { db } from '../../firebase';

import type { CreateGoalData } from '@models/goal';

export const createGoal = async (userId: string, goalData: CreateGoalData) => {
  const goalsRef = collection(db, 'users', userId, 'goals');
  const now = Timestamp.now();

  const totalDays = Math.ceil(
    (goalData.endDate.getTime() - goalData.startDate.getTime()) / (1000 * 60 * 60 * 24),
  );

  const docRef = await addDoc(goalsRef, {
    ...goalData,
    userId,
    startDate: Timestamp.fromDate(goalData.startDate),
    endDate: Timestamp.fromDate(goalData.endDate),
    characterStatus: {
      ...goalData.characterStatus,
    },
    totalDays,
    createdAt: now,
    updatedAt: now,
  });

  await addLogForGoal(userId, docRef.id, goalData.startDate, goalData.endDate);

  return docRef.id;
};
