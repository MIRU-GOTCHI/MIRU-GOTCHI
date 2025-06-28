import { convertDatesToTimestamps } from '@utils/timeStampConverter';
import { doc, getDoc, updateDoc, Timestamp } from 'firebase/firestore';

import { db } from '../../firebase';

import type { UpdateGoalData } from '@models/goal';

export const updateGoal = async (
  userId: string,
  goalId: string,
  updatedData: UpdateGoalData,
): Promise<void> => {
  const goalRef = doc(db, 'users', userId, 'goals', goalId);
  const snapshot = await getDoc(goalRef);

  if (!snapshot.exists()) {
    throw new Error('Goal not found');
  }

  const goal = snapshot.data();
  const now = new Date();
  const startDate = goal.startDate.toDate();

  if (startDate <= now) {
    throw new Error('목표 시작 날짜가 지난 후엔 수정할 수 없습니다.');
  }

  const updatePayload = convertDatesToTimestamps({
    ...updatedData,
    updatedAt: Timestamp.now(),
  });

  await updateDoc(goalRef, updatePayload);
};
