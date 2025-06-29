import { Button, styled } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const FloatingButton = styled(Button)(({ theme }) => ({
  position: 'fixed',
  bottom: 80,
  right: 24,
  width: 56,
  height: 56,
  color: '#fff',
  borderRadius: '50%',
  fontSize: 32,
  lineHeight: 0,
  boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
  minWidth: 0,
  zIndex: 10,
  transition: 'right 0.3s',
  '&:hover': {
    backgroundColor: '#1565c0',
  },
  [theme.breakpoints.up('lg')]: {
    right: 'calc(50vw - 600px + 40px)',
  },
  '@media (min-width:1800px)': {
    right: 'calc((100vw - 1500px) / 2 )',
  },
}));

const AddNewGoalButton = () => {
  const navigate = useNavigate();
  return (
    <FloatingButton onClick={() => navigate('/new')} variant="contained">
      +
    </FloatingButton>
  );
};

export default AddNewGoalButton;
