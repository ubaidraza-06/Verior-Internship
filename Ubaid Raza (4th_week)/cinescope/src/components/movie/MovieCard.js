import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Card, 
  CardMedia, 
  CardContent, 
  Typography, 
  IconButton, 
  Box,
  Chip
} from '@mui/material';
import { 
  Favorite as FavoriteIcon, 
  Bookmark as BookmarkIcon, 
  CalendarToday as CalendarIcon, 
  Star as StarIcon 
} from '@mui/icons-material';
import { useMovie } from '../../context/MovieContext';
import { imageBaseUrl } from '../../utils/api';
import StarRating from '../common/StarRating';

const MovieCard = ({ movie }) => {
  const { 
    isFavorite, 
    isInWatchlist, 
    addToFavorites, 
    removeFromFavorites,
    addToWatchlist,
    removeFromWatchlist 
  } = useMovie();

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isFavorite(movie.id)) {
      removeFromFavorites(movie.id);
    } else {
      addToFavorites(movie.id);
    }
  };

  const handleWatchlistClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isInWatchlist(movie.id)) {
      removeFromWatchlist(movie.id);
    } else {
      addToWatchlist(movie.id);
    }
  };

  const posterUrl = movie.poster_path 
    ? `${imageBaseUrl}${movie.poster_path}`
    : 'https://images.unsplash.com/photo-1489599145188-29c9e1b21e6c?w=500&h=750&fit=crop';

  return (
    <Card 
      component={Link} 
      to={`/movie/${movie.id}`}
      sx={{ 
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        textDecoration: 'none',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 4,
        },
        // Show action buttons on card hover
        '&:hover .movie-action-buttons': {
          opacity: 1
        }
      }}
    >
      <Box sx={{ position: 'relative' }}>
        <CardMedia
          component="img"
          height="320"
          image={posterUrl}
          alt={movie.title}
          sx={{ 
            objectFit: 'cover',
            transition: 'transform 0.3s ease',
            '&:hover': {
              transform: 'scale(1.05)'
            }
          }}
        />
        
        
        {/* Action Buttons */}
        <Box className="movie-action-buttons" sx={{ 
          position: 'absolute', 
          top: 12, 
          right: 12, 
          display: 'flex', 
          flexDirection: 'column', 
          gap: 1,
          // Remove opacity and hover logic to always show icons
        }}>
          <IconButton
            onClick={handleFavoriteClick}
            sx={{
              bgcolor: 'rgba(255, 255, 255, 0.2)',
              color: isFavorite(movie.id) ? 'error.main' : 'grey.700',
              backdropFilter: 'blur(4px)',
              '&:hover': {
                bgcolor: 'rgba(255, 255, 255, 0.4)'
              }
            }}
          >
            <FavoriteIcon />
          </IconButton>
          <IconButton
            onClick={handleWatchlistClick}
            sx={{
              bgcolor: 'rgba(255, 255, 255, 0.2)',
              color: isInWatchlist(movie.id) ? 'warning.main' : 'grey.700',
              backdropFilter: 'blur(4px)',
              '&:hover': {
                bgcolor: 'rgba(255, 255, 255, 0.4)'
              }
            }}
          >
            <BookmarkIcon />
          </IconButton>
        </Box>
      </Box>
      
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Typography 
          variant="h6" 
          component="h3" 
          sx={{ 
            mb: 1, 
            fontWeight: 'semibold',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 1,
            WebkitBoxOrient: 'vertical'
          }}
        >
          {movie.title}
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'text.secondary' }}>
            <CalendarIcon sx={{ fontSize: 16 }} />
            <Typography variant="body2">
              {movie.release_date ? new Date(movie.release_date).getFullYear() : 'TBA'}
            </Typography>
          </Box>
          <StarRating rating={movie.vote_average} size="small" />
        </Box>
        
        <Typography 
          variant="body2" 
          color="text.secondary"
          sx={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical'
          }}
        >
          {movie.overview}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default MovieCard;