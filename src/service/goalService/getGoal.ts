import { convertGoalDate } from '@utils/convertGoalDate';
import { db } from 'firebase';
import { doc, getDoc } from 'firebase/firestore';

import type { Goal, GoalFirestore } from '@models/goal';

export const getGoal = async (userId: string, goalId: string): Promise<Goal | null> => {
  const goalRef = doc(db, 'users', userId, 'goals', goalId);
  const goalDoc = await getDoc(goalRef);

  if (!goalDoc.exists()) return null;

  return convertGoalDate(goalDoc.data() as GoalFirestore, goalId);
};
