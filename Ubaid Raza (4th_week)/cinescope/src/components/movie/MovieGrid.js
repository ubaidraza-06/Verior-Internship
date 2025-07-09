import React from 'react';
import { Grid, Box, Typography } from '@mui/material';
import MovieCard from './MovieCard';
import LoadingSpinner from '../common/LoadingSpinner';

const MovieGrid = ({ movies, loading = false }) => {
  if (loading && movies.length === 0) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', py: 6 }}>
        <LoadingSpinner size="large" />
      </Box>
    );
  }

  if (movies.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 6 }}>
        <Typography variant="h6" color="text.secondary">
          No movies found.
        </Typography>
      </Box>
    );
  }

  return (
    <Grid container spacing={3}>
      {movies.map((movie) => (
        <Grid item xs={12} sm={6} md={4} lg={3} xl={2.4} key={movie.id}>
          <MovieCard movie={movie} />
        </Grid>
      ))}
      {loading && (
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
            <LoadingSpinner size="large" />
          </Box>
        </Grid>
      )}
    </Grid>
  );
};

export default MovieGrid;