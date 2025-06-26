import type { GoalFirestore } from "@models/goal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { convertDatesToTimestamps } from "@utils/timeStampConverter";
import { auth, db } from "firebase";
import { addDoc, collection, deleteDoc, doc, Timestamp, updateDoc } from "firebase/firestore";

export const useGoalsFirestore = () => {
  const queryClient = useQueryClient();
  const collectionName = 'goals'; // 목표 데이터를 저장할 컬렉션 이름

  // 1. 목표 추가 뮤테이션 훅
  const addGoalMutation = useMutation({
    mutationFn: async (data: GoalFirestore) => {
      const userId = auth.currentUser?.uid;
      if (!userId) {
        throw new Error('User not authenticated. Please log in to add data.');
      }

      const dataForFirestore = convertDatesToTimestamps(data);

      const finalDocData: GoalFirestore = {
        ...dataForFirestore as Omit<GoalFirestore, 'userId' | 'createdAt' | 'updatedAt'>,
        userId,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
        // characterStatus.gone은 필요에 따라 이곳에서 설정하거나 CreateGoalData에 포함
        characterStatus: {
          ...data.characterStatus,
          gone: data.characterStatus.growthStage === 'gone' // growthStage가 'gone'이면 gone: true 설정
        }
      };

      return await addDoc(collection(db, collectionName), finalDocData);
    },
    onSuccess: () => {
      // 'goals' 쿼리 키를 무효화하여 모든 목표 목록을 새로고침
      queryClient.invalidateQueries({ queryKey: [collectionName] });
    },
    onError: (error: Error) => {
      console.error('Failed to add goal:', error);
      // 여기에서 사용자에게 오류 메시지를 표시하는 등의 추가적인 오류 처리 가능
    },
  });

  // 2. 목표 업데이트 뮤테이션 훅
  const updateGoalMutation = useMutation({
    mutationFn: async ({ data }: { data: Partial<GoalFirestore> }) => {
      const dataForFirestore = convertDatesToTimestamps(data);

      const updateGoal: Partial<GoalFirestore> = {
        ...dataForFirestore as Partial<Omit<GoalFirestore, 'updatedAt'>>,
        updatedAt: Timestamp.now(),
      };

      // characterStatus.gone 업데이트 로직 (부분 업데이트 시에도 반영)
      if (data.characterStatus?.growthStage === 'gone') {
        if (!updateGoal.characterStatus) {
          updateGoal.characterStatus = { ...(dataForFirestore as Partial<GoalFirestore>).characterStatus as CharacterStatus };
        }
        updateGoal.characterStatus.gone = true;
      } else if (data.characterStatus?.growthStage) {
         if (!updateGoal.characterStatus) {
            updateGoal.characterStatus = { ...(dataForFirestore as Partial<GoalFirestore>).characterStatus as CharacterStatus };
         }
         updateGoal.characterStatus.gone = false; 
      }


      return await updateDoc(doc(db, collectionName), updateGoal);
    },
    onSuccess: (_) => {
      // 'goals' 목록과 특정 목표 상세 페이지 쿼리 키 무효화
      queryClient.invalidateQueries({ queryKey: [collectionName] });
      queryClient.invalidateQueries({ queryKey: [collectionName] });
    },
    onError: (error: Error) => {
      console.error('Failed to update goal:', error);
    },
  });

  // 3. 목표 삭제 뮤테이션 훅
  const deleteGoalMutation = useMutation({
    mutationFn: async (docId: string) => {
      return await deleteDoc(doc(db, collectionName, docId));
    },
    onSuccess: () => {
      // 'goals' 쿼리 키를 무효화하여 목록을 새로고침
      queryClient.invalidateQueries({ queryKey: [collectionName] });
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
