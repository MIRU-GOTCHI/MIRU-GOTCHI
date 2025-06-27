import { updateGoalProgress } from '@service/goalService/updateGoalProgress';
import { db } from 'firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';

export const updateAllGoalsProgress = async (userId: string) => {
  const goalsRef = collection(db, 'users', userId, 'goals');
  const inProgressQuery = query(goalsRef, where('status', '==', 'in_progress'));
  const snapshot = await getDocs(inProgressQuery);

  const updates = snapshot.docs.map((doc) => {
    return updateGoalProgress(userId, doc.id);
  });

  await Promise.all(updates);
};
