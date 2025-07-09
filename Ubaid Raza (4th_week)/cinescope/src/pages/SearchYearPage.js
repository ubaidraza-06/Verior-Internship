import React, { useState } from 'react';
import { Box, Container, Typography, Button, Grid } from '@mui/material';
import { apiService } from '../utils/api';
import MovieGrid from '../components/movie/MovieGrid';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 50 }, (_, i) => currentYear - i);

const SearchYearPage = () => {
  const [selectedYear, setSelectedYear] = useState(null);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleYearClick = async (year) => {
    setSelectedYear(year);
    setLoading(true);
    setError(null);
    try {
      const data = await apiService.discoverMovies({ primary_release_year: year });
      setMovies(data.results || []);
    } catch (err) {
      setError('Failed to fetch movies for this year.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#211212' }}>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold' }}>Select Year</Typography>
        <Grid container spacing={2} sx={{ mb: 4 }}>
          {years.map((year) => (
            <Grid item key={year}>
              <Button
                variant={selectedYear === year ? 'contained' : 'outlined'}
                color="primary"
                sx={{ minWidth: 90, bgcolor: selectedYear === year ? '#472426' : undefined, color: '#fff', borderRadius: 2, borderColor: '#472426', '&:hover': { bgcolor: '#5a2d2f' } }}
                onClick={() => handleYearClick(year)}
              >
                {year}
              </Button>
            </Grid>
          ))}
        </Grid>
        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <ErrorMessage message={error} onRetry={() => handleYearClick(selectedYear)} />
        ) : (
          <MovieGrid movies={movies} />
        )}
      </Container>
    </Box>
  );
};

export default SearchYearPage; 