import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Container, Typography } from '@mui/material';
import { apiService, imageBaseUrl } from '../utils/api';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';

const MovieDetailPage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const data = await apiService.getMovieDetails(id);
        setMovie(data);
        // Fetch trailer
        const videos = await apiService.getMovieVideos(id);
        const trailer = videos.results.find(
          v => v.site === 'YouTube' && v.type === 'Trailer'
        );
        setTrailerKey(trailer ? trailer.key : null);
        
      } catch (err) {
        console.error('Error fetching movie details:', err);
        setError('Failed to load movie details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchMovieDetails();
    }
  }, [id]);

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
        <ErrorMessage message={error} onRetry={() => window.location.reload()} />
      </Box>
    );
  }

  if (!movie) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h4">Movie not found</Typography>
      </Container>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#211212', display: 'flex', justifyContent: 'center' }}>
      <Box sx={{ width: 440, maxWidth: '100%', py: 4 }}>
        {/* Title and Meta Info */}
        <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', mb: 1, textAlign: 'left' }}>
          {movie.title}
        </Typography>
        <Box sx={{ color: 'text.secondary', mb: 1, fontSize: '1rem', textAlign: 'left' }}>
          {movie.adult === false ? 'PG-13' : 'R'}
          {movie.runtime ? ` · ${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m` : ''}
          {movie.release_date ? ` · ${movie.release_date.slice(0, 4)}` : ''}
        </Box>
        <Box sx={{ color: 'text.secondary', mb: 3, fontSize: '1rem', textAlign: 'left' }}>
          {(movie.genres || []).map(g => g.name).join(' · ')}
        </Box>
        {/* Poster */}
        {movie.poster_path && (
          <Box sx={{ mb: 4 }}>
            <img
              src={`${imageBaseUrl}${movie.poster_path}`}
              alt={movie.title}
              style={{ width: '440px', maxWidth: '100%', borderRadius: 16, boxShadow: '0 4px 24px rgba(0,0,0,0.15)' }}
            />
          </Box>
        )}
        {/* Overview */}
        <Typography variant="body1" sx={{ mb: 4, textAlign: 'left' }}>
          {movie.overview}
        </Typography>
        {/* Trailer */}
        {trailerKey && (
          <Box sx={{ mt: 4 }}>
            <Box sx={{ position: 'relative', paddingTop: '56.25%', borderRadius: 8, overflow: 'hidden', width: '100%' }}>
              <iframe
                src={`https://www.youtube.com/embed/${trailerKey}`}
                title="Movie Trailer"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  border: 0,
                  borderRadius: 8
                }}
              />
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default MovieDetailPage;