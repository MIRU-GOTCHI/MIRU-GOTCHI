import { getAllTodayLogs } from '@service/logService/getTodayLogsForGoals';
import { useQuery } from '@tanstack/react-query';

export const useGetAllTodayLogs = (userId: string) => {
  return useQuery({
    queryKey: ['allTodayLogs', userId],
    queryFn: () => getAllTodayLogs(userId),
    enabled: !!userId,
  });
};
