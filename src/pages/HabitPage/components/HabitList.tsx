import { Typography } from '@mui/material';
import HabitItem from '@pages/HabitPage/components/HabitItem';

import type { Character } from '@models/character';
import type { Goal } from '@models/goal';
import type { Log } from '@models/log';

interface HabitListProps {
  goals: Goal[];
  characters: Character[];
  onCheck: (goalId: string, logId?: string) => void;
  todayLogs: Record<string, Log | null>;
}

const HabitList = ({ goals, characters, onCheck, todayLogs }: HabitListProps) => {
  if (goals.length === 0) {
    return <Typography>습관이 없습니다</Typography>;
  }

  return (
    <>
      {goals.map((goal) => {
        const character = characters.find((c) => c.id === goal.characterId);
        return (
          <HabitItem
            key={goal.id}
            goal={goal}
            todayLog={todayLogs?.[goal.id] ?? null}
            character={character}
            onCheck={onCheck}
          />
        );
      })}
    </>
  );
};

export default HabitList;
