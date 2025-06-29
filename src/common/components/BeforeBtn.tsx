import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

interface BeforeButtonProps {
to: string;
}


const BeforeButton = styled(NavLink) ({
  width: "40px",
  height: "40px",
  padding: 0,
  fontSize: 0,
  backgroundColor: "transparent",
})

const BeforeBtn = ({to}:BeforeButtonProps) => {
  return (
    <BeforeButton  to={to}>
      <KeyboardArrowLeftIcon />
    </BeforeButton>
  )
}

export default BeforeBtn
