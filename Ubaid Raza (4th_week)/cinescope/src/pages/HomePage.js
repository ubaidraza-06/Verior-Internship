import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Box, 
  Container, 
  Typography, 
  Button, 
  Paper, 
  TextField, 
  InputAdornment, 
  IconButton
} from '@mui/material';
import { 
  TrendingUp as TrendingUpIcon, 
  Star as StarIcon, 
  CalendarToday as CalendarTodayIcon, 
  Movie as MovieIcon, 
  Search as SearchIcon
} from '@mui/icons-material';
import { apiService } from '../utils/api';
import MovieGrid from '../components/movie/MovieGrid';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';
import MovieCard from '../components/movie/MovieCard';

const HomePage = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [latestMovies, setLatestMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/search?q=${encodeURIComponent(search.trim())}`);
    }
  };

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const [trending, popular, latest] = await Promise.all([
          apiService.getTrendingMovies(),
          apiService.getPopularMovies(),
          apiService.getUpcomingMovies()
        ]);
        
        setTrendingMovies(trending.results.slice(0, 10));
        setPopularMovies(popular.results.slice(0, 10));
        setLatestMovies(latest.results.slice(0, 10));
        
      } catch (err) {
        console.error('Error fetching movies:', err);
        setError('Failed to load movies. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const handleRetry = () => {
    window.location.reload();
  };

  if (loading) {
    return (
      <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <LoadingSpinner />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <ErrorMessage message={error} onRetry={handleRetry} />
      </Box>
    );
  }

  const MovieSection = ({ title, icon, movies, category }) => (
    <Box sx={{ mb: 6 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 4 }}>
        <Typography variant="h4" component="h2" sx={{ display: 'flex', alignItems: 'center', gap: 1, fontWeight: 'bold' }}>
          {icon}
          {title}
        </Typography>
        <Button 
          component={Link} 
          to={`/movies?category=${category}`}
          sx={{ color: 'primary.main', '&:hover': { color: 'primary.dark' } }}
        >
          View All
        </Button>
      </Box>
      <MovieGrid movies={movies} />
    </Box>
  );

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#211212' }}>
      {/* Search Bar */}
      <Container maxWidth="lg" sx={{ pt: 6, pb: 2 }}>
        <form onSubmit={handleSearchSubmit}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search for movies..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            sx={{
              '& .MuiOutlinedInput-root': {
                backgroundColor: '#472426',
              }
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton type="submit" edge="end">
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
        </form>
      </Container>
      <Container maxWidth="lg" sx={{ py: 6 }}>
        {/* Trending */}
        <Box sx={{ mb: 6 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <TrendingUpIcon sx={{ color: 'primary.main', mr: 1 }} />
            <Typography variant="h5" fontWeight="bold">Trending Now</Typography>
          </Box>
          <Box sx={{ display: 'flex', overflowX: 'auto', gap: 2, pb: 2, scrollbarWidth: 'none', '&::-webkit-scrollbar': { display: 'none' } }}>
            {trendingMovies.map(movie => (
              <Box key={movie.id} sx={{ minWidth: 220, maxWidth: 220 }}>
                <MovieCard movie={movie} />
              </Box>
            ))}
          </Box>
        </Box>
        {/* Popular */}
        <Box sx={{ mb: 6 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <StarIcon sx={{ color: 'primary.main', mr: 1 }} />
            <Typography variant="h5" fontWeight="bold">Popular Movies</Typography>
          </Box>
          <Box sx={{ display: 'flex', overflowX: 'auto', gap: 2, pb: 2, scrollbarWidth: 'none', '&::-webkit-scrollbar': { display: 'none' } }}>
            {popularMovies.map(movie => (
              <Box key={movie.id} sx={{ minWidth: 220, maxWidth: 220 }}>
                <MovieCard movie={movie} />
              </Box>
            ))}
          </Box>
        </Box>
        {/* Latest */}
        <Box sx={{ mb: 6 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <CalendarTodayIcon sx={{ color: 'primary.main', mr: 1 }} />
            <Typography variant="h5" fontWeight="bold">Latest</Typography>
          </Box>
          <Box sx={{ display: 'flex', overflowX: 'auto', gap: 2, pb: 2, scrollbarWidth: 'none', '&::-webkit-scrollbar': { display: 'none' } }}>
            {latestMovies.map(movie => (
              <Box key={movie.id} sx={{ minWidth: 220, maxWidth: 220 }}>
                <MovieCard movie={movie} />
              </Box>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default HomePage;