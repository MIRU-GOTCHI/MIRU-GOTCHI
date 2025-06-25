import { convertGoalFromFirestore } from '@service/goalService/goalConverter';
import { collection, doc, getDoc, getDocs, orderBy, query } from 'firebase/firestore';

import { db } from '../../firebase';

import type { Goal, GoalFirestore } from '@models/goal';

export const goalService = {
  // 유저의 목표 다 가져오기
  async getUserGoals(userId: string): Promise<Goal[]> {
    const goalsRef = collection(db, 'users', userId, 'goals');
    const q = query(goalsRef, orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) =>
      convertGoalFromFirestore(doc.data() as GoalFirestore, doc.id),
    );
  },

  // 특정 목표 가져오기
  async getGoal(userId: string, goalId: string): Promise<Goal | null> {
    const goalRef = doc(db, 'users', userId, 'goals', goalId);
    const goalDoc = await getDoc(goalRef);

    if (!goalDoc.exists()) return null;

    return convertGoalFromFirestore(goalDoc.data() as GoalFirestore, goalId);
  },
};
