import React, { useMemo, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, Box } from '@mui/material';
import { MovieProvider } from './context/MovieContext';
import Header from './components/layout/Header';
import HomePage from './pages/HomePage';
import MovieDetailPage from './pages/MovieDetailPage';
import SearchPage from './pages/SearchPage';
import MyListPage from './pages/MyListPage';
import GenresPage from './pages/GenresPage';
import SearchGenrePage from './pages/SearchGenrePage';
import SearchYearPage from './pages/SearchYearPage';
// (Add placeholder components for TV and People if needed)

// Create Material UI theme with mode support
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#211212',
      paper: '#2a1818',
    },
  },
  typography: {
    fontFamily: '"Plus Jakarta Sans", sans-serif',
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <MovieProvider>
        <Router>
          <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
            <Header />
            <Box component="main">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/movie/:id" element={<MovieDetailPage />} />
                <Route path="/search" element={<SearchPage />} />
                <Route path="/mylist" element={<MyListPage />} />
                <Route path="/genres" element={<GenresPage />} />
                <Route path="/searchGenre" element={<SearchGenrePage />} />
                <Route path="/searchYear" element={<SearchYearPage />} />
                {/* Optionally add these if you have nav links */}
                <Route path="/tv" element={<div>TV Shows Coming Soon</div>} />
                <Route path="/people" element={<div>People Page Coming Soon</div>} />
              </Routes>
            </Box>
          </Box>
        </Router>
      </MovieProvider>
    </ThemeProvider>
  );
}

export default App;