import { useGetTodayLog } from '@hooks/useGetTodayLog';
import { Box, Typography, Checkbox, CircularProgress } from '@mui/material';
import { styled as muiStyled } from '@mui/material/styles';
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
  justify-content: space-between;
  cursor: pointer;
  transition: background-color 0.2s ease;
  color: #444;

  background-color: ${({ checked }) => (checked ? '#E8E8E8' : '#ADC9EA')};

  &:hover {
    background-color: ${({ checked }) => (checked ? '#D3D3D3' : '#7DACE2')};
  }
`;

const ContentsWrapper = muiStyled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: 12,
});

const CharacterContainer = styled.div`
  position: relative;
  width: 50px;
  height: 50px;
`;

const CharacterImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 6px;
  background-color: #f2f2f3;
`;

const CompletedLabel = styled(Typography)`
  font-weight: bold;
  color: #666;
  margin-left: 8px;
`;

const CustomCheckbox = muiStyled(Checkbox)({
  color: '#fff',
  '&.Mui-checked': {
    color: '#87CEEB',
  },
  '&.Mui-disabled': {
    color: '#999',
  },
  '& .MuiSvgIcon-root': {
    fontSize: 28,
  },
  marginRight: 8,
});

const TextContainer = muiStyled(Box)({
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  flex: 1,
});

const TruncatedTypography = muiStyled(Typography)(({ theme }) => ({
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  fontSize: '20px',
  [theme.breakpoints.down('md')]: {
    fontSize: '14px',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '12px',
  },
}));

interface HomeHabitItemProps {
  goal: Goal;
  character?: Character;
  onCheck: (goalId: string, logId?: string) => void;
}

const HomeHabitItem = ({ goal, character, onCheck }: HomeHabitItemProps) => {
  const navigate = useNavigate();
  const { data: log, isLoading, isError } = useGetTodayLog(goal.id);

  const stage = goal.characterStatus?.gone ? 'gone' : goal.characterStatus?.growthStage;
  const imagePath = character
    ? goal.characterStatus.gone
      ? `/assets/images/character/${stage}.png`
      : `/assets/images/character/${character.type}/${character.type}-${stage}.png`
    : '';

  const isTodayCompleted = log?.checked === true;

  return (
    <HabitCard onClick={() => navigate(`/habit/${goal.id}`)} checked={!!isTodayCompleted}>
      {character && (
        <>
          {isLoading && (
            <Typography fontSize={12}>
              <CircularProgress size={16} sx={{ mr: 1, verticalAlign: 'middle' }} />
              로딩 중...
            </Typography>
          )}
          {isError && (
            <Typography fontSize={12}>
              목표를 불러오지 못했습니다.
            </Typography>
          )}
          <ContentsWrapper>
            <CharacterContainer>
              <CharacterImage src={imagePath} alt={character.name} />
            </CharacterContainer>
            <TextContainer>
              <TruncatedTypography
                variant="body1"
                sx={{
                  color: isTodayCompleted ? '#666' : '#050505',
                  fontWeight: 500,
                }}
              >
                {goal.title}
              </TruncatedTypography>
              {log && isTodayCompleted && (
                <CompletedLabel sx={{ fontSize: '12px' }}>오늘 목표 완료!</CompletedLabel>
              )}
            </TextContainer>
          </ContentsWrapper>
          {goal.status === 'in_progress' && log && (
            <CustomCheckbox
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

export default HomeHabitItem;
