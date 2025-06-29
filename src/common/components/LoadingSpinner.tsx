import { Box } from '@mui/material';
import React from 'react';
import { PacmanLoader } from 'react-spinners';

const LoadingSpinner = () => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="60px">
      <Box
        sx={{
          color: 'secondary.main',
        }}
      >
        <PacmanLoader color="currentColor" size={16} speedMultiplier={0.8} />
      </Box>
    </Box>
  );
};

export default LoadingSpinner;
