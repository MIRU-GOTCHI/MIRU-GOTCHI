import { getGoal } from '@service/goalService';
import { useQuery } from '@tanstack/react-query';

export const useGetGoal = (userId: string, goalId: string) => {
  return useQuery({
    queryKey: ['goals', userId, goalId],
    queryFn: () => getGoal(userId, goalId),
    enabled: !!userId && !!goalId,
  });
};
