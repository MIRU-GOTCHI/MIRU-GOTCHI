import { Typography } from '@mui/material';
import HabitItem from '@pages/HabitPage/components/HabitItem';

import type { Character } from '@models/character';
import type { Goal } from '@models/goal';
import type { Log } from '@models/log';

interface HabitListProps {
  goals: Goal[];
  logs: Record<string, Log | null>;
  characters: Character[];
  onCheck: (goalId: string, logId?: string) => void;
}

const HabitList = ({ goals, logs, characters, onCheck }: HabitListProps) => {
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
            character={character}
            log={logs[goal.id] ?? null}
            onCheck={onCheck}
          />
        );
      })}
    </>
  );
};

export default HabitList;
