import { useGetTodayLog } from '@hooks/useGetTodayLog';
import { Box, Typography, Checkbox, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import type { Character } from '@models/character';
import type { Goal } from '@models/goal';

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
  onCheck: (goalId: string, logId?: string) => void;
}

const HabitItem = ({ goal, character, onCheck }: HabitItemProps) => {
  const navigate = useNavigate();
  const { data: log, isLoading, isError } = useGetTodayLog(goal.id);

  const stage = goal.characterStatus?.gone ? 'gone' : goal.characterStatus?.growthStage;
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
            {isLoading && (
              <Typography color="text.secondary" fontSize={14}>
                <CircularProgress size={18} sx={{ mr: 1, verticalAlign: 'middle' }} />
                오늘 목표 불러오는 중...
              </Typography>
            )}
            {isError && (
              <Typography color="error" fontSize={14}>
                오늘의 목표를 불러오지 못했습니다.
              </Typography>
            )}
            {log && isTodayCompleted && <CompletedLabel>오늘 목표 완료!</CompletedLabel>}
          </Box>
          {goal.status === 'in_progress' && log && (
            <Checkbox
              checked={log.checked || false}
              disabled={log.checked}
              onClick={(e) => {
                e.stopPropagation();
                if (!log.checked) onCheck(goal.id, log.id);
              }}
            />
          )}
        </>
      )}
    </HabitCard>
  );
};

export default HabitItem;
