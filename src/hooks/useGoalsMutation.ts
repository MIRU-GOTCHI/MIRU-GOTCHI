import { createGoal as createGoalService } from '@service/goalService';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { convertDatesToTimestamps } from '@utils/timeStampConverter';
import { updateDoc, deleteDoc, doc, Timestamp } from 'firebase/firestore';

import { auth, db } from '../firebase';
import { useAuthContext } from './auth/useAuthContext';

import type { CharacterStatus } from '@models/character';
import type { CreateGoalData, GoalFirestore } from '@models/goal';

export const useGoalsFirestore = () => {
  const queryClient = useQueryClient();
  const goalsSubCollectionName = 'goals';

  const { userId: contextUserId } = useAuthContext();
  const getUserId = () => {
    const userId = auth.currentUser?.uid;
    const finalUserId = userId || contextUserId;
    if (!finalUserId) {
      throw new Error('User not authenticated. Please log in.');
    }
    return finalUserId;
  };

  // 1. 목표 추가 뮤테이션 훅
  const addGoalMutation = useMutation({
    mutationFn: async (data: CreateGoalData) => {
      const userId = getUserId();

      return await createGoalService(userId, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [goalsSubCollectionName] });
    },
    onError: (error: Error) => {
      console.error('Failed to add goal:', error);
    },
  });

  // 2. 목표 업데이트 뮤테이션 훅
  const updateGoalMutation = useMutation({
    mutationFn: async (payload: { docId: string; data: Partial<CreateGoalData> }) => {
      const userId = getUserId(); // userId 가져오기
      const { docId, data } = payload;

      const dataForFirestore = convertDatesToTimestamps(data);

      const updatePayload: Partial<GoalFirestore> = {
        ...(dataForFirestore as Partial<Omit<GoalFirestore, 'updatedAt'>>),
        updatedAt: Timestamp.now(),
      };

      // characterStatus.gone 업데이트 로직
      if (data.characterStatus?.growthStage !== undefined) {
        if (!updatePayload.characterStatus) {
          updatePayload.characterStatus = {
            growthStage: data.characterStatus.growthStage,
            level: data.characterStatus.level || 0,
          } as CharacterStatus & { gone?: boolean };
        }

        if (data.characterStatus.growthStage === 'gone') {
          updatePayload.characterStatus!.gone = true;
        } else {
          updatePayload.characterStatus!.gone = false;
        }
      }

      // users/{userId}/goals/{docId} 문서 참조 생성
      const goalDocRef = doc(db, 'users', userId, goalsSubCollectionName, docId);
      return await updateDoc(goalDocRef, updatePayload);
    },
    onSuccess: (_, variables) => {
      // 사용자별 목표 목록과 특정 목표 상세 페이지 쿼리 키 무효화
      queryClient.invalidateQueries({ queryKey: [goalsSubCollectionName] });
      queryClient.invalidateQueries({ queryKey: [goalsSubCollectionName, variables.docId] });
    },
    onError: (error: Error) => {
      console.error('Failed to update goal:', error);
    },
  });

  // 3. 목표 삭제 뮤테이션 훅
  const deleteGoalMutation = useMutation({
    mutationFn: async (docId: string) => {
      const userId = getUserId(); // userId 가져오기

      // users/{userId}/goals/{docId} 문서 참조 생성
      const goalDocRef = doc(db, 'users', userId, goalsSubCollectionName, docId);
      return await deleteDoc(goalDocRef);
    },
    onSuccess: () => {
      // 사용자별 목표 목록 쿼리 키 무효화
      queryClient.invalidateQueries({ queryKey: [goalsSubCollectionName] });
    },
    onError: (error: Error) => {
      console.error('Failed to delete goal:', error);
    },
  });

  return {
    addGoal: addGoalMutation,
    updateGoal: updateGoalMutation,
    deleteGoal: deleteGoalMutation,
  };
};
