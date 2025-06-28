import { Box, Typography, Checkbox } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import type { Character } from '@models/character';
import type { Goal } from '@models/goal';
import type { Log } from '@models/log';

const HabitCard = styled(Box)<{ checked: boolean }>`
  border: 1px solid #ccc;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 16px;
  cursor: pointer;
  transition: background-color 0.2s ease;

  background-color: ${({ checked }) => (checked ? '#B0E501' : '#5B93D5')};

  &:hover {
    background-color: ${({ checked }) => (checked ? '#A0D400' : '#4A80BF')};
  }
`;
const CharacterContainer = styled.div`
  position: relative;
  width: 80px;
  height: 80px;
`;

const CharacterImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 8px;
  background-color: #f2f2f3;
`;

const CharacterNameOverlay = styled(Typography)`
  position: absolute;
  top: 4px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 10px;
  font-weight: bold;
  color: #333;
  background-color: #f2f2f3;
  border-radius: 4px;
`;
const CompletedLabel = styled(Typography)`
  font-weight: bold;
  color: #5b93d5;
  margin-left: 8px;
`;
interface HabitItemProps {
  goal: Goal;
  character?: Character;
  log: Log | null;
  onCheck: (goalId: string, logId?: string) => void;
}

const HabitItem = ({ goal, character, log, onCheck }: HabitItemProps) => {
  const navigate = useNavigate();

  const stage = goal.characterStatus?.gone ? 'gone' : goal.characterStatus.growthStage;
  const imagePath = character
    ? `/assets/images/character/${character.type}/${character.type}-${stage}.png`
    : '';

  const isTodayCompleted = log?.checked === true;

  return (
    <HabitCard onClick={() => navigate(`/habit/${goal.id}`)} checked={!!isTodayCompleted}>
      {character && (
        <>
          <CharacterContainer>
            <CharacterImage src={imagePath} alt={character.name} />
            <CharacterNameOverlay>{character.name}</CharacterNameOverlay>
          </CharacterContainer>

          <Box flex={1}>
            <Typography variant="h6" sx={{ color: isTodayCompleted ? '#666' : '' }}>
              {goal.title}
            </Typography>
            {isTodayCompleted && <CompletedLabel>오늘 목표 완료!</CompletedLabel>}
          </Box>
          {goal.status === 'in_progress' && log && (
            <Checkbox
              checked={log.checked || false}
              onClick={(e) => {
                e.stopPropagation();
                onCheck(goal.id, log.id);
              }}
            />
          )}
        </>
      )}
    </HabitCard>
  );
};
export default HabitItem;
