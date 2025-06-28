import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { convertTimestampToDate } from '@utils/timeStampConverter';
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  Timestamp,
  runTransaction,
} from 'firebase/firestore';
import { useState, useEffect } from 'react';

import { db, auth } from '../firebase';
import { useAuthContext } from './auth/useAuthContext';

import type { Goal, GoalFirestore } from '@models/goal';
import type { Log, LogFirestore } from '@models/log';
import type { DocumentData, DocumentReference } from 'firebase/firestore';

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

  const { data: todayLog, isLoading: isLoadingLog, error: logError } = useQuery<Log | null, Error>({
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

  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    if (todayLog) {
      setIsChecked(todayLog.checked);
    } else {
      setIsChecked(false);
    }
  }, [todayLog]);

  const logMutation = useMutation<string | void, Error, boolean, unknown>({
    mutationFn: async (newCheckedStatus: boolean) => {
      const actualUserId = getActualUserId();
      if (!goalId) throw new Error('Goal ID is missing.');

      let processedLogId: string | undefined;

      await runTransaction(db, async (transaction) => {
        const goalRef = doc(db, 'users', actualUserId, 'goals', goalId);
        const goalDoc = await transaction.get(goalRef);

        if (!goalDoc.exists()) {
          throw new Error('Goal document does not exist!');
        }
        const currentGoalData = goalDoc.data() as GoalFirestore;
        let newSuccessCount = currentGoalData.successCount ?? 0;

        let logRef: DocumentReference<DocumentData> | undefined;
        let oldCheckedStatusForLog: boolean | undefined;

        if (todayLog) {
          logRef = doc(collection(db, 'users', actualUserId, 'goals', goalId, 'logs'), todayLog.id);
          const logDocInTransaction = await transaction.get(logRef);
          if (logDocInTransaction.exists()) {
            oldCheckedStatusForLog = logDocInTransaction.data().checked;
          }
        }

        const isLogExistingAndCheckedBefore = oldCheckedStatusForLog === true;

        if (newCheckedStatus === true && !isLogExistingAndCheckedBefore) {
          newSuccessCount++;
        } else if (newCheckedStatus === false && isLogExistingAndCheckedBefore) {
          newSuccessCount = Math.max(0, newSuccessCount - 1);
        }

        const logDateTimestamp = Timestamp.fromDate(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()));

        if (logRef && oldCheckedStatusForLog !== undefined) {
          transaction.update(logRef, { checked: newCheckedStatus, updatedAt: Timestamp.now() });
          processedLogId = todayLog!.id;
        } else {
          const newLogRef = doc(collection(db, 'users', actualUserId, 'goals', goalId, 'logs'));
          processedLogId = newLogRef.id;
          transaction.set(newLogRef, {
            goalId: goalId,
            date: logDateTimestamp,
            checked: newCheckedStatus,
            createdAt: Timestamp.now(),
          } as LogFirestore);
        }

        transaction.update(goalRef, { successCount: newSuccessCount, updatedAt: Timestamp.now() });
      });

      return processedLogId;
    },
    onSuccess: (mutatedLogId, newCheckedStatus) => {
      queryClient.setQueryData(todayQueryKey, (oldData: Log | null) => {
        if (oldData) {
          return { ...oldData, checked: newCheckedStatus };
        }
        if (mutatedLogId) {
          return {
            id: mutatedLogId,
            goalId: goalId!,
            date: convertTimestampToDate(Timestamp.now()),
            checked: newCheckedStatus,
            createdAt: convertTimestampToDate(Timestamp.now()),
          };
        }
        return null;
      });

      queryClient.setQueryData(['goals', getActualUserId(), goalId], (oldGoal: Goal | null) => {
        if (oldGoal) {
          const oldChecked = todayLog ? todayLog.checked : false;
          let newSuccessCount = oldGoal.successCount ?? 0;

          if (newCheckedStatus === true && oldChecked === false) {
            newSuccessCount++;
          } else if (newCheckedStatus === false && oldChecked === true) {
            newSuccessCount = Math.max(0, newSuccessCount - 1);
          }
          return { ...oldGoal, successCount: newSuccessCount };
        }
        return oldGoal;
      });

      queryClient.invalidateQueries({ queryKey: todayQueryKey });
      queryClient.invalidateQueries({ queryKey: ['goals', getActualUserId(), goalId] });
      queryClient.invalidateQueries({ queryKey: ['goals'] });
    },
    onError: (err) => {
      alert('습관 완료 상태 변경 중 오류가 발생했습니다: ' + err.message);
    }
  });

  const checkLog = () => logMutation.mutate(true);
  const uncheckLog = () => logMutation.mutate(false);

  return {
    isChecked,
    checkLog,
    uncheckLog,
    isLoadingLog: isLoadingLog,
    isUpdatingLog: logMutation.isPending,
    logError: logError,
    logMutationError: logMutation.error,
  };
};
