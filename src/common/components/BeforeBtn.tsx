import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import styled from 'styled-components';

interface BeforeButtonProps {
  handleClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const BeforeButton = styled("button")({
  width: "40px",
  height: "40px",
  padding: 0,
  fontSize: 0,
  backgroundColor: "transparent",
})

const BeforeBtn = ({ handleClick }: BeforeButtonProps) => {
  return (
    <BeforeButton type='button' onClick={handleClick}>
      <KeyboardArrowLeftIcon />
    </BeforeButton>
  )
}

export default BeforeBtn
