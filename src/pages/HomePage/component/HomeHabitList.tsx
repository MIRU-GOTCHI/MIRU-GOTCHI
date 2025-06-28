import { Typography } from '@mui/material';

import HomeHabitItem from './HomeHabitItem';

import type { Character } from '@models/character';
import type { Goal } from '@models/goal';

interface HomeHabitListProps {
  goals: Goal[];
  characters: Character[];
  onCheck: (goalId: string, logId?: string) => void;
}

const HomeHabitList = ({ goals, characters, onCheck }: HomeHabitListProps) => {
  if (goals.length === 0) {
    return <Typography sx={{ textAlign: 'center', color: '#666' }}>습관이 없습니다</Typography>;
  }

  return (
    <>
      {goals.map((goal) => {
        const character = characters.find((c) => c.id === goal.characterId);
        return <HomeHabitItem key={goal.id} goal={goal} character={character} onCheck={onCheck} />;
      })}
    </>
  );
};

export default HomeHabitList;
