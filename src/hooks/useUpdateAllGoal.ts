import { updateAllGoalsProgress } from '@service/goalService/updateAllGoalsProgress';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface UpdateAllGoalsProgressParams {
  userId: string;
}

export const useUpdateAllGoalsProgress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ userId }: UpdateAllGoalsProgressParams) => {
      return updateAllGoalsProgress(userId);
    },
    onSuccess: (_, { userId }) => {
      queryClient.invalidateQueries({
        queryKey: ['goals', userId],
      });

      queryClient.invalidateQueries({
        queryKey: ['goals', userId],
        type: 'all',
      });

      const todayKey = new Date().toISOString().split('T')[0];
      queryClient.invalidateQueries({
        queryKey: ['todayLog'],
        predicate: (query) => {
          const queryKey = query.queryKey as string[];
          return queryKey.includes(todayKey) && queryKey.includes(userId);
        },
      });
    },
    onError: (error) => {
      console.error('Failed to update all goals progress:', error);
    },
  });
};
