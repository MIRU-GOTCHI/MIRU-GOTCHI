import { convertTimestampToDate } from '@utils/timeStampConverter';

import type { Goal, GoalFirestore } from '@models/goal';

export const convertGoalDate = (data: GoalFirestore, id: string): Goal => {
  const totalDays = Math.ceil(
    (convertTimestampToDate(data.endDate).getTime() -
      convertTimestampToDate(data.startDate).getTime()) /
      (1000 * 60 * 60 * 24),
  );

  return {
    id,
    status: data.status,
    userId: data.userId,
    title: data.title,
    description: data.description,
    startDate: convertTimestampToDate(data.startDate),
    endDate: convertTimestampToDate(data.endDate),
    characterId: data.characterId,
    characterStatus: {
      ...data.characterStatus,
    },
    successCount: data.successCount,
    failCount: data.failCount,
    totalDays,
    createdAt: convertTimestampToDate(data.createdAt),
    updatedAt: convertTimestampToDate(data.updatedAt),
  };
};
