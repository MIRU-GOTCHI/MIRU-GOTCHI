import { Box, Grid, styled } from '@mui/material';
import ToggleButton, { toggleButtonClasses } from '@mui/material/ToggleButton';
import ToggleButtonGroup, { toggleButtonGroupClasses } from '@mui/material/ToggleButtonGroup';

import catEgg from '../../../assets/images/character/cat/cat-egg.png';
import dogEgg from '../../../assets/images/character/dog/dog-egg.png';
import hamsterEgg from '../../../assets/images/character/hamster/hamster-egg.png';
import rabbitEgg from '../../../assets/images/character/rabbit/rabbit-egg.png';
import titEgg from '../../../assets/images/character/tit/tit-egg.png';
const CharacterFormBox = styled(Grid)({
  width: '100%',
  height: 'auto',
  borderRadius: '15px',
  backgroundColor: '#F2F2F3',
  padding: '10px',
  display: 'flex',
  flexDirection: 'column',
  gap: 5,
  fontFamily: 'Galmuri14',
  alignItems: "center",
  justifyContent: "center",
  "& .characterSelectGroup": {
    marginTop: "5px",
    '@media (min-width: 1001px)': { gap: "15px" },
  }
});
const CharInformText = styled('p')({
  color: '#00000090',
  '@media (max-width: 600px)': { fontSize: '12px' },
});
const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  width: '100%',
  gap: 5,
  display: 'flex',
  // flexGrow: 1,
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: "10px",
  '@media (min-width: 1001px)': { marginTop: "20px" },
  [`& .${toggleButtonGroupClasses.firstButton}, & .${toggleButtonGroupClasses.middleButton}`]: {
    borderTopRightRadius: (theme.vars || theme).shape.borderRadius,
    borderBottomRightRadius: (theme.vars || theme).shape.borderRadius,
  },
  [`& .${toggleButtonGroupClasses.lastButton}, & .${toggleButtonGroupClasses.middleButton}`]: {
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
  // width: '15vh',
  width: '20%',
  minWidth: "70px",
  maxWidth: "100px",
  aspectRatio: '1/1',
  backgroundColor: '#fff',
  border: "1px solid #ddd",
  boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.05)',
  '&.Mui-selected': {
    backgroundColor: '#5B93D530',
    border: '2px solid #5B93D5',
  },
  '@media (min-width: 1001px)': { 
    width: '25%',
    maxWidth: "120px" 
  },
  '@media (min-width: 601px) and (max-width: 1000px)': { maxWidth: "90px" },
});
const EggGrid = styled(Grid)({
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  gap: 10,
  '@media (min-width: 1001px)': { gap: 15,},
});
const EggImg = styled('img')({
  width: '100%',
  objectFit: 'contain',
});
interface CharacterFormContProps {
  characterId: string;
  onCharacterChange: (newCharacterId: string) => void;
}

const CharacterFormCont: React.FC<CharacterFormContProps> = ({
  characterId,
  onCharacterChange,
}) => {
  const handleCharacterSelection = (
    _event: React.MouseEvent<HTMLElement>,
    newCharacterId: string | null,
  ) => {
    if (newCharacterId !== null) {
      onCharacterChange(newCharacterId);
    }
  };
  return (
    <CharacterFormBox size={{ xs: 12, md: 6 }}>
      <Box fontSize={{ xs: '17', md: '20px' }}> 캐릭터 선택 </Box>
      <CharInformText>미루는 습관을 깨워줄 알을 선택하세요.</CharInformText>
      <StyledToggleButtonGroup
        value={characterId}
        exclusive
        onChange={handleCharacterSelection}
        aria-label="text alignment"
      >
        <Grid container spacing={1} className="characterSelectGroup">
          <EggGrid size={12}>
            {/* 햄찌 미루찌 */}
            <StyledToggleButton value="DZ1OHxn48Z5zRwtt50TP" aria-label="left aligned">
              <EggImg src={hamsterEgg} alt="" />
            </StyledToggleButton>
            {/* "멍멍 늦잠멍" */}
            <StyledToggleButton value="YYlClvXJADbJO9ru1VG3" aria-label="centered">
              <EggImg src={dogEgg} alt="" />
            </StyledToggleButton>
          </EggGrid>
          <EggGrid size={12}>
            {/* "빨라진 레이토" */}
            <StyledToggleButton value="bEFnSlfFSbK9QVq0arjT" aria-label="right aligned">
              <EggImg src={rabbitEgg} alt="" />
            </StyledToggleButton>
            {/* 성장형 뱁새 나중삐" */}
            <StyledToggleButton value="cJb5qHB1Z7GFm79SCitA" aria-label="justified">
              <EggImg src={titEgg} alt="" />
            </StyledToggleButton>
            {/* "게으름 탈출냥" */}
            <StyledToggleButton value="t0vhk3H3NCZACFLL7c0s" aria-label="justified">
              <EggImg src={catEgg} alt="" />
            </StyledToggleButton>
          </EggGrid>
        </Grid>
      </StyledToggleButtonGroup>
    </CharacterFormBox>
  );
};

export default CharacterFormCont;
