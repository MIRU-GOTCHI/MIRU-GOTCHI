import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import styled from 'styled-components';

const BeforeButton = styled("button") ({
  width: "40px",
  height: "40px",
  padding: 0,
  fontSize: 0,
})

const BeforeBtn = () => {
  return (
    <BeforeButton type='button'>
      <KeyboardArrowLeftIcon />
    </BeforeButton>
  )
}

export default BeforeBtn