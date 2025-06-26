import { logService } from '@service/logService/logService';
import { useQuery } from '@tanstack/react-query';

export const useGetLogs = (userId: string, goalId: string) => {
  return useQuery({
    queryKey: ['logs', userId, goalId],
    queryFn: () => logService.getGoalLogs(userId, goalId),
    enabled: !!userId && !!goalId,
  });
};
