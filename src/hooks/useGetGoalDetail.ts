import { getGoalDetail } from '@service/goalService';
import { useQuery } from '@tanstack/react-query';

export const useGetGoalDetail = (userId: string,goalId:string  ) => {
  return useQuery({
    queryKey: ['goals', userId,goalId],
    queryFn: async () => getGoalDetail(userId,goalId),
    enabled: !!userId,
  });
};
