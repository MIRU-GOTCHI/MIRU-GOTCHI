import { Box, Grid, styled } from '@mui/material'
import ToggleButton, { toggleButtonClasses } from '@mui/material/ToggleButton';
import ToggleButtonGroup, {
  toggleButtonGroupClasses,
} from '@mui/material/ToggleButtonGroup';

const CharacterFormBox = styled(Grid)({
  width: '100%',
  height: 'auto',
  borderRadius: '15px',
  backgroundColor: '#D9D9D9',
  padding: '0 20px'
})
const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  gap: '2rem',
  [`& .${toggleButtonGroupClasses.firstButton}, & .${toggleButtonGroupClasses.middleButton}`]:
  {
    borderTopRightRadius: (theme.vars || theme).shape.borderRadius,
    borderBottomRightRadius: (theme.vars || theme).shape.borderRadius,
  },
  [`& .${toggleButtonGroupClasses.lastButton}, & .${toggleButtonGroupClasses.middleButton}`]:
  {
    borderTopLeftRadius: (theme.vars || theme).shape.borderRadius,
    borderBottomLeftRadius: (theme.vars || theme).shape.borderRadius,
    borderLeft: `1px solid ${(theme.vars || theme).palette.divider}`,
  },
  [`& .${toggleButtonGroupClasses.lastButton}.${toggleButtonClasses.disabled}, & .${toggleButtonGroupClasses.middleButton}.${toggleButtonClasses.disabled}`]:
  {
    borderLeft: `1px solid ${(theme.vars || theme).palette.action.disabledBackground}`,
  },
}));

interface CharacterFormContProps {
  characterId: string;
  onCharacterChange: (newCharacterId: string) => void;
}

const CharacterFormCont: React.FC<CharacterFormContProps> =
  ({ characterId, onCharacterChange }) => {
    const handleCharacterSelection = (
      event: React.MouseEvent<HTMLElement>,
      newCharacterId: string | null,
    ) => {
      if (newCharacterId !== null) {
        onCharacterChange(newCharacterId);
      }
    };
    return (
      <CharacterFormBox size={{ xs: 12, md: 6 }}>
        <h2> 캐릭터 선택 </h2>
        <Box width={'100%'}>
          <StyledToggleButtonGroup
            value={characterId}
            exclusive
            onChange={handleCharacterSelection}
            aria-label="text alignment"
          >
            {/* 햄찌 미루찌 */}
            <ToggleButton value="DZ1OHxn48Z5zRwtt50TP" aria-label="left aligned">
              1
            </ToggleButton>
            {/* "멍멍 늦잠멍" */}
            <ToggleButton value="YYlClvXJADbJO9ru1VG3" aria-label="centered">
              2
            </ToggleButton>
            {/* "빨라진 레이토" */}
            <ToggleButton value="bEFnSlfFSbK9QVq0arjT" aria-label="right aligned">
              3
            </ToggleButton>
            {/* 성장형 뱁새 나중삐" */}
            <ToggleButton value="cJb5qHB1Z7GFm79SCitA" aria-label="justified" >
              4
            </ToggleButton>
            {/* "게으름 탈출냥" */}
            <ToggleButton value="t0vhk3H3NCZACFLL7c0s" aria-label="justified" >
              5
            </ToggleButton>
          </StyledToggleButtonGroup>
        </Box>

      </CharacterFormBox>
    )
  }

export default CharacterFormCont

