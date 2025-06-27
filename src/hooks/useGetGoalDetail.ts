import { getGoalDetail } from '@service/goalService';
import { useQuery } from '@tanstack/react-query';

export const useGetGoalDetail = (userId: string | null | undefined, goalId: string | undefined) => {
  return useQuery({
    queryKey: ['goals', userId, goalId],
    queryFn: async () => {
      if (!userId || !goalId) {
        return null;
      }
      return getGoalDetail(userId, goalId);
    },
    enabled: !!userId && !!goalId,
  });
};
