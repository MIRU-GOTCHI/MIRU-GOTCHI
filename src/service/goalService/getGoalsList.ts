import { convertGoalDate } from '@service/goalService/converter';
import { collection, doc, getDoc, getDocs, orderBy, query } from 'firebase/firestore';

import { db } from '../../firebase';

import type { Goal, GoalFirestore } from '@models/goal';

export const getGoalsList = async (userId: string): Promise<Goal[]> => {
  const goalsRef = collection(db, 'users', userId, 'goals');
  const q = query(goalsRef, orderBy('createdAt', 'desc'));
  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map((doc) => convertGoalDate(doc.data() as GoalFirestore, doc.id));
};
export const getGoalDetail = async (userId: string, goalId: string): Promise<Goal | null> => {
  const goalDocRef = doc(db, 'users', userId, 'goals', goalId);

  const docSnap = await getDoc(goalDocRef);

  if (docSnap.exists()) {
    return convertGoalDate(docSnap.data() as GoalFirestore, docSnap.id); 
  } else {
    console.log(`No such goal document for userId: ${userId}, goalId: ${goalId}`);
    return null;
  }
};
