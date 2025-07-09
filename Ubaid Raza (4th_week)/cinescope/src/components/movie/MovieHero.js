import React from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Chip,
  Container
} from '@mui/material';
import { 
  PlayArrow as PlayIcon,
  CalendarToday as CalendarIcon,
  AccessTime as ClockIcon
} from '@mui/icons-material';
import { backdropBaseUrl } from '../../utils/api';
import StarRating from '../common/StarRating';

const MovieHero = ({ movie, onPlayTrailer }) => {
  const backdropUrl = movie.backdrop_path
    ? `${backdropBaseUrl}${movie.backdrop_path}`
    : 'https://images.unsplash.com/photo-1489599145188-29c9e1b21e6c?w=1280&h=720&fit=crop';

  return (
    <Box sx={{ 
      position: 'relative', 
      height: { xs: 400, md: 500, lg: 600 }, 
      overflow: 'hidden' 
    }}>
      {/* Background Image */}
      <Box sx={{ position: 'absolute', inset: 0 }}>
        <Box
          component="img"
          src={backdropUrl}
          alt={movie.title}
          sx={{ 
            width: '100%', 
            height: '100%', 
            objectFit: 'cover' 
          }}
        />
        <Box sx={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,1), rgba(0,0,0,0.5), transparent)'
        }} />
        <Box sx={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to right, rgba(0,0,0,0.8), rgba(0,0,0,0.4), transparent)'
        }} />
      </Box>

      {/* Content */}
      <Box sx={{ 
        position: 'relative', 
        zIndex: 1, 
        height: '100%', 
        display: 'flex', 
        alignItems: 'flex-end' 
      }}>
        <Container maxWidth="lg" sx={{ pb: 4 }}>
          <Box sx={{ maxWidth: 800 }}>
            <Typography 
              variant="h2" 
              component="h1" 
              sx={{ 
                color: 'white', 
                mb: 2, 
                fontWeight: 'bold',
                fontSize: { xs: '2rem', md: '3rem', lg: '4rem' }
              }}
            >
              {movie.title}
            </Typography>
            
            {movie.tagline && (
              <Typography 
                variant="h5" 
                sx={{ 
                  color: 'warning.main', 
                  mb: 3, 
                  fontStyle: 'italic',
                  fontSize: { xs: '1.25rem', md: '1.5rem' }
                }}
              >
                {movie.tagline}
              </Typography>
            )}
            
            <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 3, mb: 3 }}>
              <StarRating rating={movie.vote_average} size="large" />
              
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'white' }}>
                <CalendarIcon sx={{ fontSize: 20 }} />
                <Typography>
                  {new Date(movie.release_date).getFullYear()}
                </Typography>
              </Box>
              
              {movie.runtime && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'white' }}>
                  <ClockIcon sx={{ fontSize: 20 }} />
                  <Typography>
                    {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m
                  </Typography>
                </Box>
              )}
              
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {(movie.genres || []).slice(0, 3).map(genre => (
                  <Chip
                    key={genre.id}
                    label={genre.name}
                    size="small"
                    sx={{
                      bgcolor: 'rgba(255, 193, 7, 0.2)',
                      color: 'warning.main',
                      '& .MuiChip-label': { fontSize: '0.875rem' }
                    }}
                  />
                ))}
              </Box>
            </Box>
            
            <Typography 
              variant="body1" 
              sx={{ 
                color: 'grey.200', 
                mb: 4, 
                maxWidth: 600, 
                lineHeight: 1.6,
                fontSize: '1.125rem'
              }}
            >
              {movie.overview}
            </Typography>
            
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
              <Button
                variant="contained"
                startIcon={<PlayIcon />}
                onClick={onPlayTrailer}
                sx={{
                  bgcolor: 'warning.main',
                  color: 'white',
                  px: 4,
                  py: 1.5,
                  fontWeight: 'semibold',
                  '&:hover': { bgcolor: 'warning.dark' }
                }}
              >
                Watch Trailer
              </Button>
              
              {movie.homepage && (
                <Button
                  variant="outlined"
                  component="a"
                  href={movie.homepage}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    color: 'white',
                    borderColor: 'rgba(255, 255, 255, 0.3)',
                    px: 4,
                    py: 1.5,
                    fontWeight: 'semibold',
                    backdropFilter: 'blur(4px)',
                    '&:hover': {
                      borderColor: 'rgba(255, 255, 255, 0.5)',
                      bgcolor: 'rgba(255, 255, 255, 0.1)'
                    }
                  }}
                >
                  Official Site
                </Button>
              )}
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default MovieHero;