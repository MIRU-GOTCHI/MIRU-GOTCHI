import { updateGoalProgress } from '@service/goalService/updateGoalProgress';
import { completeTodayLog } from '@service/logService/completeTodayLog';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface CompleteTodayLogParams {
  userId: string;
  goalId: string;
  logId: string;
}

export const useCompleteTodayLog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ userId, goalId, logId }: CompleteTodayLogParams) => {
      await completeTodayLog(userId, goalId, logId);
      return updateGoalProgress(userId, goalId);
    },
    onSuccess: (_, { userId, goalId }) => {
      const todayKey = new Date().toISOString().split('T')[0];

      queryClient.invalidateQueries({
        queryKey: ['todayLog', goalId, todayKey, userId],
        exact: true,
      });

      queryClient.invalidateQueries({
        queryKey: ['goals', userId],
      });

      queryClient.invalidateQueries({
        queryKey: ['goals', userId, goalId],
      });
    },
    onError: (error) => {
      console.error('Failed to complete today log:', error);
    },
  });
};
