import { goalService } from '@service/goalService/goalService';
import { useQuery } from '@tanstack/react-query';

export const useGetGoals = (userId: string) => {
  return useQuery({
    queryKey: ['goals', userId],
    queryFn: () => goalService.getUserGoals(userId),
    enabled: !!userId,
  });
};
