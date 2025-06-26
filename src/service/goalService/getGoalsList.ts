import { convertGoalDate } from '@service/goalService/converter';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';

import { db } from '../../firebase';

import type { Goal, GoalFirestore } from '@models/goal';

export const getGoalsList = async (userId: string): Promise<Goal[]> => {
  const goalsRef = collection(db, 'users', userId, 'goals');
  const q = query(goalsRef, orderBy('createdAt', 'desc'));
  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map((doc) => convertGoalDate(doc.data() as GoalFirestore, doc.id));
};
