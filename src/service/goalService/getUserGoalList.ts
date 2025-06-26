import { convertGoalDate } from '@utils/convertGoalDate';
import { db } from 'firebase';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';

import type { Goal, GoalFirestore } from '@models/goal';

export const getUserGoalList = async (userId: string): Promise<Goal[]> => {
  const goalsRef = collection(db, 'users', userId, 'goals');
  const q = query(goalsRef, orderBy('createdAt', 'desc'));
  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map((doc) => convertGoalDate(doc.data() as GoalFirestore, doc.id));
};
