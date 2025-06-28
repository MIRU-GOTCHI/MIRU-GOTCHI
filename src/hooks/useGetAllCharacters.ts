import { getAllCharacters } from '@service/characterService.ts/getAllCharacters';
import { useQuery } from '@tanstack/react-query';

export const useGetAllCharacters = () => {
  return useQuery({
    queryKey: ['all-characters'],
    queryFn: () => getAllCharacters(),
  });
};
