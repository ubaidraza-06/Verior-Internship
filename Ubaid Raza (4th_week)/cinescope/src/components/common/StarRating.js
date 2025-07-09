import React from 'react';
import { Box, Typography } from '@mui/material';
import { Star as StarIcon } from '@mui/icons-material';

const StarRating = ({ 
  rating, 
  maxRating = 10, 
  size = 'medium', 
  showNumber = true 
}) => {
  const percentage = (rating / maxRating) * 100;
  const stars = Math.round(rating / 2);
  
  const sizeMap = {
    small: 12,
    medium: 16,
    large: 20
  };

  const textSizeMap = {
    small: 'caption',
    medium: 'body2',
    large: 'body1'
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        {[...Array(5)].map((_, i) => (
          <StarIcon
            key={i}
            sx={{
              fontSize: sizeMap[size],
              color: i < stars ? 'warning.main' : 'grey.300',
              fill: i < stars ? 'warning.main' : 'transparent'
            }}
          />
        ))}
      </Box>
      {showNumber && (
        <Typography 
          variant={textSizeMap[size]} 
          sx={{ fontWeight: 'medium', color: 'text.primary' }}
        >
          {rating.toFixed(1)}
        </Typography>
      )}
    </Box>
  );
};

export default StarRating;