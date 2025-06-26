import { logService } from '@service/logService/logService';
import { convertGoalDate } from '@utils/convertGoalDate';
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  Timestamp,
} from 'firebase/firestore';

import { db } from '../../firebase';

import type { CreateGoalData, Goal, GoalFirestore } from '@models/goal';

export const goalService = {
  // 유저의 목표 다 가져오기
  async getUserGoals(userId: string): Promise<Goal[]> {
    const goalsRef = collection(db, 'users', userId, 'goals');
    const q = query(goalsRef, orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => convertGoalDate(doc.data() as GoalFirestore, doc.id));
  },

  // 특정 목표 가져오기
  async getGoal(userId: string, goalId: string): Promise<Goal | null> {
    const goalRef = doc(db, 'users', userId, 'goals', goalId);
    const goalDoc = await getDoc(goalRef);

    if (!goalDoc.exists()) return null;

    return convertGoalDate(goalDoc.data() as GoalFirestore, goalId);
  },

  async createGoal(userId: string, goalData: CreateGoalData) {
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

    await logService.addLogForGoal(userId, docRef.id, goalData.startDate, goalData.endDate);

    return docRef.id;
  },
};
