import React, { createContext, useContext, useEffect, useState } from 'react';

const MovieContext = createContext(undefined);

export const useMovie = () => {
  const context = useContext(MovieContext);
  if (!context) {
    throw new Error('useMovie must be used within a MovieProvider');
  }
  return context;
};

export const MovieProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('movie-favorites');
    return saved ? JSON.parse(saved) : [];
  });

  const [watchlist, setWatchlist] = useState(() => {
    const saved = localStorage.getItem('movie-watchlist');
    return saved ? JSON.parse(saved) : [];
  });

  const [genres, setGenres] = useState([]);

  useEffect(() => {
    localStorage.setItem('movie-favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('movie-watchlist', JSON.stringify(watchlist));
  }, [watchlist]);

  const addToFavorites = (movieId) => {
    setFavorites(prev => [...prev, movieId]);
  };

  const removeFromFavorites = (movieId) => {
    setFavorites(prev => prev.filter(id => id !== movieId));
  };

  const addToWatchlist = (movieId) => {
    setWatchlist(prev => [...prev, movieId]);
  };

  const removeFromWatchlist = (movieId) => {
    setWatchlist(prev => prev.filter(id => id !== movieId));
  };

  const isFavorite = (movieId) => favorites.includes(movieId);
  const isInWatchlist = (movieId) => watchlist.includes(movieId);

  return (
    <MovieContext.Provider
      value={{
        favorites,
        watchlist,
        genres,
        addToFavorites,
        removeFromFavorites,
        addToWatchlist,
        removeFromWatchlist,
        isFavorite,
        isInWatchlist,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};