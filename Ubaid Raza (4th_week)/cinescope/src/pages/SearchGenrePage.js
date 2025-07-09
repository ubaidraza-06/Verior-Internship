import React, { useEffect, useState } from 'react';
import { Box, Container, Typography, Button, Grid } from '@mui/material';
import { apiService } from '../utils/api';
import MovieGrid from '../components/movie/MovieGrid';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';

const SearchGenrePage = () => {
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    apiService.getGenres().then(data => setGenres(data.genres || []));
  }, []);

  const handleGenreClick = async (genreId) => {
    setSelectedGenre(genreId);
    setLoading(true);
    setError(null);
    try {
      const data = await apiService.discoverMovies({ with_genres: genreId });
      setMovies(data.results || []);
    } catch (err) {
      setError('Failed to fetch movies for this genre.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#211212' }}>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold' }}>Select Genre</Typography>
        <Grid container spacing={2} sx={{ mb: 4 }}>
          {genres.map((genre) => (
            <Grid item key={genre.id}>
              <Button
                variant={selectedGenre === genre.id ? 'contained' : 'outlined'}
                color="primary"
                sx={{ minWidth: 120, bgcolor: selectedGenre === genre.id ? '#472426' : undefined, color: '#fff', borderRadius: 2, borderColor: '#472426', '&:hover': { bgcolor: '#5a2d2f' } }}
                onClick={() => handleGenreClick(genre.id)}
              >
                {genre.name}
              </Button>
            </Grid>
          ))}
        </Grid>
        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <ErrorMessage message={error} onRetry={() => handleGenreClick(selectedGenre)} />
        ) : (
          <MovieGrid movies={movies} />
        )}
      </Container>
    </Box>
  );
};

export default SearchGenrePage; 