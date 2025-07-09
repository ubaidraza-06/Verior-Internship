import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Box, Container, Typography, FormControl, InputLabel, Select, MenuItem, OutlinedInput } from '@mui/material';
import { apiService } from '../utils/api';
import MovieGrid from '../components/movie/MovieGrid';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 50 }, (_, i) => currentYear - i);

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [genres, setGenres] = useState([]);
  const [genre, setGenre] = useState('');
  const [year, setYear] = useState('');
  const searchQuery = searchParams.get('q') || '';
  const navigate = useNavigate();

  // Fetch genres on mount
  useEffect(() => {
    apiService.getGenres().then(data => setGenres(data.genres || []));
  }, []);

  // Fetch movies when search query or filters change
  useEffect(() => {
    const fetchResults = async () => {
      if (!searchQuery.trim() && !genre && !year) {
        setMovies([]);
        return;
      }
      setLoading(true);
      setError(null);
      try {
        let data = { results: [] };
        if (searchQuery.trim()) {
          // Use searchMovies for query, then filter by genre/year on client
          data = await apiService.searchMovies(searchQuery);
          let filtered = data.results || [];
          if (genre) {
            filtered = filtered.filter(movie => (movie.genre_ids || []).includes(Number(genre)));
          }
          if (year) {
            filtered = filtered.filter(movie => (movie.release_date || '').startsWith(year));
          }
          setMovies(filtered);
        } else {
          // No query: use discoverMovies for genre/year filtering
          const params = {
            with_genres: genre || undefined,
            primary_release_year: year || undefined,
          };
          data = await apiService.discoverMovies(params);
          setMovies(data.results || []);
        }
      } catch (err) {
        setError('Failed to search movies. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchResults();
  }, [searchQuery, genre, year]);

  // Build heading with only the search query
  const heading = `Search results for "${searchQuery}"`;

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#211212', display: 'flex' }}>
      {/* Sidebar Filters */}
      <Box sx={{ width: 260, p: 4, pr: 2, bgcolor: 'transparent', display: { xs: 'none', md: 'block' } }}>
        <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold' }}>Filters</Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Box
            component="button"
            onClick={() => navigate('/searchGenre')}
            sx={{
              width: '100%',
              bgcolor: '#472426',
              color: '#fff',
              border: 'none',
              borderRadius: 2,
              p: 2,
              fontSize: '1rem',
              cursor: 'pointer',
              fontWeight: 'bold',
              textAlign: 'left',
              '&:hover': { bgcolor: '#5a2d2f' },
            }}
          >
            Genre
          </Box>
          <Box
            component="button"
            onClick={() => navigate('/searchYear')}
            sx={{
              width: '100%',
              bgcolor: '#472426',
              color: '#fff',
              border: 'none',
              borderRadius: 2,
              p: 2,
              fontSize: '1rem',
              cursor: 'pointer',
              fontWeight: 'bold',
              textAlign: 'left',
              '&:hover': { bgcolor: '#5a2d2f' },
            }}
          >
            Year
          </Box>
        </Box>
      </Box>
      {/* Main Content */}
      <Container maxWidth="lg" sx={{ py: 4, flex: 1, ml: { md: 0 } }}>
        <Typography variant="h5" component="h1" sx={{ mb: 4, fontWeight: 'bold', fontSize: { xs: '1.3rem', md: '1.7rem' } }}>
          {heading}
        </Typography>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
            <LoadingSpinner />
          </Box>
        ) : error ? (
          <ErrorMessage message={error} onRetry={() => window.location.reload()} />
        ) : movies.length === 0 && searchQuery ? (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h6" color="text.secondary">
              No movies found for "{searchQuery}"
            </Typography>
          </Box>
        ) : (
          <MovieGrid movies={movies} />
        )}
      </Container>
    </Box>
  );
};

export default SearchPage;