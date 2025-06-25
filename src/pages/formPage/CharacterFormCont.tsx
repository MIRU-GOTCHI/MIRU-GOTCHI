import { Box, Grid, styled } from '@mui/material'
import ToggleButton, { toggleButtonClasses } from '@mui/material/ToggleButton';
import ToggleButtonGroup, {
  toggleButtonGroupClasses,
} from '@mui/material/ToggleButtonGroup';

const CharacterFormBox = styled(Grid)({
  width: '100%',
  height: 'auto',
  borderRadius: '5px',
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
const CharacterFormCont = () => {
  return (
    <CharacterFormBox size={{ xs: 12, md: 6 }}>
      <h2> 캐릭터 선택 </h2>
      <Box width={'100%'}>
        <StyledToggleButtonGroup
          // value={alignment}
          exclusive
          // onChange={handleAlignment}
          aria-label="text alignment"
        >
          <ToggleButton value="left" aria-label="left aligned">
            1
          </ToggleButton>
          <ToggleButton value="center" aria-label="centered">
            2
          </ToggleButton>
          <ToggleButton value="right" aria-label="right aligned">
            3
          </ToggleButton>
          <ToggleButton value="justify" aria-label="justified" >
            4
          </ToggleButton>
          <ToggleButton value="justify" aria-label="justified" >
            5
          </ToggleButton>
        </StyledToggleButtonGroup>
      </Box>

    </CharacterFormBox>
  )
}

export default CharacterFormCont

