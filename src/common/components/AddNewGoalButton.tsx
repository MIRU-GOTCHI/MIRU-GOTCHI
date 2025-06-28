import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const FloatingButton = styled(Button)`
  && {
    position: fixed;
    bottom: 80px;
    right: 24px;
    width: 56px;
    height: 56px;
    color: white;
    border-radius: 50%;
    font-size: 32px;
    line-height: 0;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
    min-width: 0;
    z-index: 10;

    &:hover {
      background-color: #1565c0;
    }
  }
`;
const AddNewGoalButton = () => {
  const navigate = useNavigate();
  return (
    <FloatingButton onClick={() => navigate('/new')} variant="contained">
      +
    </FloatingButton>
  );
};
export default AddNewGoalButton;
