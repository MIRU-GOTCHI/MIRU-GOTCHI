import { collection, doc, getDocs, writeBatch } from 'firebase/firestore';

import { db } from '../../firebase';

export const deleteGoal = async (userId: string, goalId: string): Promise<void> => {
  try {
    const batch = writeBatch(db);
    const goalRef = doc(db, 'users', userId, 'goals', goalId);

    batch.delete(goalRef);
    const logsRef = collection(db, 'users', userId, 'goals', goalId, 'logs');

    const LogSnapshot = await getDocs(logsRef);

    LogSnapshot.forEach((logDoc) => {
      batch.delete(logDoc.ref);
    });

    await batch.commit();
  } catch (error) {
    console.error('deleteGoal 에러:', error);
    throw error;
  }
};
