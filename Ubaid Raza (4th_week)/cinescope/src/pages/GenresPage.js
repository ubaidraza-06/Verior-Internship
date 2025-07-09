import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, Grid, Card, CardContent, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const GenresPage = () => {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    // TODO: Fetch genres from an API or a data source
    // For now, we'll use a placeholder array
    setGenres([
      { id: 1, name: 'Action' },
      { id: 2, name: 'Comedy' },
      { id: 3, name: 'Drama' },
      { id: 4, name: 'Horror' },
      { id: 5, name: 'Sci-Fi' },
      { id: 6, name: 'Thriller' },
      { id: 7, name: 'Romance' },
      { id: 8, name: 'Adventure' },
      { id: 9, name: 'Animation' },
      { id: 10, name: 'Documentary' },
    ]);
  }, []);

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#211212' }}>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" sx={{ mb: 4, fontWeight: 'bold' }}>
          Movie Genres
        </Typography>
        
        <Grid container spacing={3}>
          {genres.map((genre) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={genre.id}>
              <Card>
                <CardContent>
                  <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
                    {genre.name}
                  </Typography>
                  <Button
                    component={Link}
                    to={`/movies?genre=${genre.id}`}
                    variant="outlined"
                    fullWidth
                  >
                    Browse Movies
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default GenresPage;