import { collection, query, where, getDocs, doc, updateDoc, Timestamp } from 'firebase/firestore';

import { db } from '../../firebase';

import type { GrowthStage } from '@models/common';

const calculateGrowthStage = (successRatio: number): GrowthStage => {
  if (successRatio >= 0.9) return 'adult';
  if (successRatio >= 0.6) return 'teen';
  if (successRatio >= 0.3) return 'baby';
  return 'egg';
};

export const updateGoalProgress = async (userId: string, goalId: string) => {
  const goalRef = doc(db, 'users', userId, 'goals', goalId);
  const logsRef = collection(db, 'users', userId, 'goals', goalId, 'logs');

  const now = new Date();
  now.setHours(0, 0, 0, 0);

  const failQuery = query(
    logsRef,
    where('date', '<', Timestamp.fromDate(now)),
    where('checked', '==', false),
  );

  const failSnapshot = await getDocs(failQuery);
  const failCount = failSnapshot.size;

  const goalSnap = await getDocs(
    query(collection(db, 'users', userId, 'goals'), where('__name__', '==', goalId)),
  );
  if (goalSnap.empty) return;

  const goalData = goalSnap.docs[0].data();
  const successCount = goalData.successCount;
  const totalDays = goalData.totalDays;

  const successRatio = totalDays === 0 ? 0 : successCount / totalDays;

  let growthStage: GrowthStage;
  let gone = false;

  if (failCount >= 3) {
    growthStage = 'gone';
    gone = true;
  } else {
    growthStage = calculateGrowthStage(successRatio);
  }

  await updateDoc(goalRef, {
    failCount,
    characterStatus: {
      growthStage,
      level: goalData.characterStatus.level,
      gone,
    },
  });
};
