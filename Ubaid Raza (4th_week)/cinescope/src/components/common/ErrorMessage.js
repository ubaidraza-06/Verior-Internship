import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Error as ErrorIcon } from '@mui/icons-material';

const ErrorMessage = ({ message, onRetry }) => {
  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      p: 4, 
      textAlign: 'center' 
    }}>
      <ErrorIcon sx={{ fontSize: 48, color: 'error.main', mb: 2 }} />
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 'semibold' }}>
        Oops! Something went wrong
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3, maxWidth: 400 }}>
        {message}
      </Typography>
      {onRetry && (
        <Button
          variant="contained"
          onClick={onRetry}
          sx={{ 
            bgcolor: 'primary.main',
            '&:hover': { bgcolor: 'primary.dark' }
          }}
        >
          Try Again
        </Button>
      )}
    </Box>
  );
};

export default ErrorMessage;