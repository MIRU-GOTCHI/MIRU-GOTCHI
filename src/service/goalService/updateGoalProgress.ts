import {
  collection,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
  Timestamp,
  getDoc,
} from 'firebase/firestore';

import { db } from '../../firebase';

import type { GrowthStage } from '@models/common';

const calculateGrowthStage = (successRatio: number): GrowthStage => {
  if (successRatio >= 0.9) return 'adult';
  if (successRatio >= 0.6) return 'teen';
  if (successRatio >= 0.3) return 'baby';
  return 'egg';
};
const calculateLevel = (successRatio: number): number => {
  if (successRatio >= 0.8) return 3;
  if (successRatio >= 0.5) return 2;
  if (successRatio >= 0.3) return 1;
  return 0;
};

export const updateGoalProgress = async (userId: string, goalId: string): Promise<void> => {
  const goalRef = doc(db, 'users', userId, 'goals', goalId);
  const goalSnap = await getDoc(goalRef);

  if (!goalSnap.exists()) return;

  const goalData = goalSnap.data();
  const endDate = goalData.endDate.toDate();
  const now = new Date();

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const logsRef = collection(db, 'users', userId, 'goals', goalId, 'logs');
  const failQuery = query(
    logsRef,
    where('date', '<', Timestamp.fromDate(today)),
    where('checked', '==', false),
  );
  const failSnapshot = await getDocs(failQuery);
  const failCount = failSnapshot.size;

  const successCount = goalData.successCount ?? 0;
  const totalDays = goalData.totalDays ?? 0;
  const successRatio = totalDays === 0 ? 0 : successCount / totalDays;

  let growthStage: GrowthStage;
  let gone = false;
  let status = goalData.status;

  if (failCount >= 3) {
    growthStage = 'gone';
    gone = true;
    status = 'failed';
  } else {
    growthStage = calculateGrowthStage(successRatio);
    if (now > endDate) {
      status = 'completed';
    }
  }

  await updateDoc(goalRef, {
    failCount,
    status,
    characterStatus: {
      growthStage,
      level: calculateLevel(successRatio),
      gone,
    },
    updatedAt: Timestamp.now(),
  });
};
