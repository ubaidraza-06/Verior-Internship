import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, Tabs, Tab } from '@mui/material';
import { useMovie } from '../context/MovieContext';
import MovieGrid from '../components/movie/MovieGrid';
import { apiService } from '../utils/api';

const MyListPage = () => {
  const { favorites, watchlist } = useMovie();
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [watchlistMovies, setWatchlistMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    if (!favorites || favorites.length === 0) {
      setFavoriteMovies([]);
    } else {
      setLoading(true);
      setError(null);
      Promise.all(favorites.map(id => apiService.getMovieDetails(id)))
        .then(movies => setFavoriteMovies(movies))
        .catch(() => setError('Failed to load favorite movies.'))
        .finally(() => setLoading(false));
    }
  }, [favorites]);

  useEffect(() => {
    if (!watchlist || watchlist.length === 0) {
      setWatchlistMovies([]);
    } else {
      setLoading(true);
      setError(null);
      Promise.all(watchlist.map(id => apiService.getMovieDetails(id)))
        .then(movies => setWatchlistMovies(movies))
        .catch(() => setError('Failed to load watchlist movies.'))
        .finally(() => setLoading(false));
    }
  }, [watchlist]);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const renderContent = () => {
    if (loading) {
      return (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" color="text.secondary">Loading...</Typography>
        </Box>
      );
    }

    if (error) {
      return (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" color="error">{error}</Typography>
        </Box>
      );
    }

    const currentMovies = activeTab === 0 ? favoriteMovies : watchlistMovies;
    const emptyMessage = activeTab === 0 
      ? "You haven't added any movies to your favorites yet."
      : "You haven't added any movies to your watchlist yet.";

    if (currentMovies.length === 0) {
      return (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" color="text.secondary">
            {emptyMessage}
          </Typography>
        </Box>
      );
    }

    return <MovieGrid movies={currentMovies} />;
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#211212' }}>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" sx={{ mb: 4, fontWeight: 'bold' }}>
          My List
        </Typography>
        
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 4 }}>
          <Tabs 
            value={activeTab} 
            onChange={handleTabChange}
            sx={{
              '& .MuiTab-root': {
                color: 'text.secondary',
                '&.Mui-selected': {
                  color: 'primary.main',
                },
              },
            }}
          >
            <Tab label={`Favorites (${favorites.length})`} />
            <Tab label={`Watchlist (${watchlist.length})`} />
          </Tabs>
        </Box>
        
        {renderContent()}
      </Container>
    </Box>
  );
};

export default MyListPage; 