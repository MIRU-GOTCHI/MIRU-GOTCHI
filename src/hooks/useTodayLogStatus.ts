import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { convertTimestampToDate } from '@utils/timeStampConverter';
import { collection, query, where, getDocs, addDoc, updateDoc, doc, Timestamp } from 'firebase/firestore';
import { useState, useEffect } from 'react';

import { db, auth } from '../firebase';
import { useAuthContext } from './auth/useAuthContext';
 
import type { Log, LogFirestore } from '@models/log';
 


const _getStartOfTodayTimestamp = (): Timestamp => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return Timestamp.fromDate(today);
};

const _getStartOfTomorrowTimestamp = (): Timestamp => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);
  return Timestamp.fromDate(tomorrow);
};

export const useTodayLogStatus = (goalId: string | undefined) => {
  const queryClient = useQueryClient();
  const { userId: authContextUserId } = useAuthContext(); 

  const getActualUserId = () => {
    const firebaseAuthUid = auth.currentUser?.uid;
    const finalUserId = firebaseAuthUid || authContextUserId;
    if (!finalUserId) {
      throw new Error('User not authenticated. Please log in.');
    }
    return finalUserId;
  };

  const todayStartTimestamp = _getStartOfTodayTimestamp();
  const tomorrowStartTimestamp = _getStartOfTomorrowTimestamp();

  const todayQueryKey = ['todayLog', goalId, todayStartTimestamp.toDate().toISOString().split('T')[0], authContextUserId];

  const { data: todayLog, isLoading, error } = useQuery<Log | null, Error>({
    queryKey: todayQueryKey,
    queryFn: async (): Promise<Log | null> => {
      const actualUserId = getActualUserId(); 
      if (!goalId) return null;

      const logsRef = collection(db, 'users', actualUserId, 'goals', goalId, 'logs');
      const q = query(
        logsRef,
        where('date', '>=', todayStartTimestamp),
        where('date', '<', tomorrowStartTimestamp)
      );
      const snapshot = await getDocs(q);

      if (!snapshot.empty) {
        const docSnap = snapshot.docs[0];
        const logData = docSnap.data() as LogFirestore;
        return {
          id: docSnap.id,
          goalId: logData.goalId,
          date: convertTimestampToDate(logData.date),
          checked: logData.checked,
          createdAt: convertTimestampToDate(logData.createdAt),
        };
      }
      return null; 
    },
    enabled: !!authContextUserId && !!goalId,
    gcTime: 1000 * 60 * 10, 
    staleTime: 1000 * 60 * 5, 
  });

  // --- 2. 로그의 'checked' 상태를 관리하는 로컬 상태 ---
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    if (todayLog) {
      setIsChecked(todayLog.checked);
    } else {
      setIsChecked(false); // 로그가 없으면 미완료 상태로 간주
    }
  }, [todayLog]);

  // --- 3. 로그 업데이트 및 생성 뮤테이션 (useMutation) ---
  const logMutation = useMutation<string | void, Error, boolean, unknown>({ 
    mutationFn: async (newCheckedStatus: boolean) => {
      const actualUserId = getActualUserId(); 
      if (!goalId) throw new Error('Goal ID is missing.');

      const logsCollectionRef = collection(db, 'users', actualUserId, 'goals', goalId, 'logs');

      if (todayLog) {
        // 기존 로그가 존재하면 업데이트
        const logDocRef = doc(logsCollectionRef, todayLog.id);
        await updateDoc(logDocRef, { checked: newCheckedStatus, updatedAt: Timestamp.now() });
        return todayLog.id;
      } else {
        // 기존 로그가 없으면 새로 생성
        const newLogData: LogFirestore = {
          goalId: goalId,
          date: Timestamp.fromDate(new Date()),
          checked: newCheckedStatus,
          createdAt: Timestamp.now(),
        };
        const docRef = await addDoc(logsCollectionRef, newLogData);
        return docRef.id; 
      }
    },
    onSuccess: (mutatedLogId, newCheckedStatus) => {
      queryClient.setQueryData(todayQueryKey, (oldData: Log | null) => {
        if (oldData) {
          return { ...oldData, checked: newCheckedStatus };
        }
        return {
          id: mutatedLogId as string,
          goalId: goalId!,
          date: convertTimestampToDate(Timestamp.now()),
          checked: newCheckedStatus,
          createdAt: convertTimestampToDate(Timestamp.now()),
        };
      });
      queryClient.invalidateQueries({ queryKey: todayQueryKey });
      queryClient.invalidateQueries({ queryKey: ['goals', getActualUserId(), goalId] });
    },
    onError: (err) => {
      console.error("Failed to update/create log:", err);
    }
  });

  // --- 4. 외부로 노출할 함수들 ---
  const checkLog = () => logMutation.mutate(true); 
  const uncheckLog = () => logMutation.mutate(false); 

  return {
    isChecked,
    checkLog,
    uncheckLog,
    isLoadingLog: isLoading,
    isUpdatingLog: logMutation.isPending,
    logError: error, 
    logMutationError: logMutation.error, 
  };
};
