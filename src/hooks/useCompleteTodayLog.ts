import { completeTodayLog } from "@service/logService/completeTodayLog";
import { useQuery } from "@tanstack/react-query";

export const useCompleteTodayLog = (userId: string, goalId: string, logId: string) => {
  return useQuery({
    queryKey: ['complete-today-log', userId, goalId, logId],
    queryFn: () => completeTodayLog(userId, goalId, logId),
    enabled: !!userId && !!goalId && !!logId,
  });
};