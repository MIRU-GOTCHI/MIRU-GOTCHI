
import { getTodayLog } from '@service/logService';
import { useQuery } from '@tanstack/react-query';

import { useAuthContext } from './auth/useAuthContext';

import type { Log } from '@models/log'; 

export const useGetTodayLog = (goalId: string | undefined) => {
  const { userId } = useAuthContext(); 

  const todayKey = new Date().toISOString().split('T')[0];

  return useQuery<Log | null, Error>({
    queryKey: ['todayLog', goalId, todayKey, userId],
    queryFn: async (): Promise<Log | null> => {
      if (!userId || !goalId) {
        return null;
      }
      return getTodayLog(userId, goalId);
    },
    enabled: !!userId && !!goalId,
    staleTime: 1000 * 60 * 5,
  });
};
