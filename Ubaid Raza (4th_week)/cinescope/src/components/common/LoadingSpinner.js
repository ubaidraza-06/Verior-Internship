import React from 'react';
import { Box, CircularProgress } from '@mui/material';

const LoadingSpinner = ({ size = 'medium' }) => {
  const sizeMap = {
    small: 16,
    medium: 24,
    large: 32
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <CircularProgress 
        size={sizeMap[size]} 
        sx={{ color: 'primary.main' }}
      />
    </Box>
  );
};

export default LoadingSpinner;