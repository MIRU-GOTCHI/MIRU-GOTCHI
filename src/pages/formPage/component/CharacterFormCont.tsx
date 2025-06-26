import { Box, Grid, styled } from '@mui/material'
import ToggleButton, { toggleButtonClasses } from '@mui/material/ToggleButton';
import ToggleButtonGroup, {
  toggleButtonGroupClasses,
} from '@mui/material/ToggleButtonGroup';

const CharacterFormBox = styled(Grid)({
  width: '100%',
  height: 'auto',
  borderRadius: '15px',
  backgroundColor: '#FF101015',
  padding: '10px 20px',
  display:'flex',
  flexDirection:'column',
  gap:5,
  fontFamily:'Galmuri14'
})
const CharInformText = styled('p')({
  color:'#00000090'
})
const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  width:'100%',
  gap: 5,
  display:'flex',
  flexGrow: 1,
  justifyContent:'center',
  alignItems:'center',
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
const StyledToggleButton = styled(ToggleButton)({
 width:'50%',
 height:'15vh',
 backgroundColor:'#fff',
 border:'none',
  boxShadow: 'inset 0px 0px 10px rgba(0, 0, 0, 0.05)',
 '&.Mui-selected': {
  backgroundColor:'#5B93D530',
  border: '2px solid #5B93D5'
 }
})
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
          <Box fontSize={'20px'}> 캐릭터 선택 </Box>
          <CharInformText>미루는 습관을 깨워줄 알을 선택하세요.</CharInformText>
          <StyledToggleButtonGroup
            value={characterId}
            exclusive
            onChange={handleCharacterSelection}
            aria-label="text alignment"
          >
            {/* 햄찌 미루찌 */}
            <StyledToggleButton value="DZ1OHxn48Z5zRwtt50TP" aria-label="left aligned">
              1
            </StyledToggleButton>
            {/* "멍멍 늦잠멍" */}
            <StyledToggleButton value="YYlClvXJADbJO9ru1VG3" aria-label="centered">
              2
            </StyledToggleButton>
            {/* "빨라진 레이토" */}
            <StyledToggleButton value="bEFnSlfFSbK9QVq0arjT" aria-label="right aligned">
              3
            </StyledToggleButton>
            {/* 성장형 뱁새 나중삐" */}
            <StyledToggleButton value="cJb5qHB1Z7GFm79SCitA" aria-label="justified" >
              4
            </StyledToggleButton>
            {/* "게으름 탈출냥" */}
            <StyledToggleButton value="t0vhk3H3NCZACFLL7c0s" aria-label="justified" >
              5
            </StyledToggleButton>
          </StyledToggleButtonGroup>

      </CharacterFormBox>
    )
  }

export default CharacterFormCont

