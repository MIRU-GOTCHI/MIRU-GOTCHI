import { getGoalsList } from '@service/goalService';
import { useQuery } from '@tanstack/react-query';

export const useGetGoals = (userId: string) => {
  return useQuery({
    queryKey: ['goals', userId],
    queryFn: () => getGoalsList(userId),
    enabled: !!userId,
  });
};
