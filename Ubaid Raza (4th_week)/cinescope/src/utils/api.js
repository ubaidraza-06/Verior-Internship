import axios from 'axios';

const API_KEY = '7605368d5fde866e4e75f23d74ae4630'; // Replace with your actual API key
const BASE_URL = 'https://api.themoviedb.org/3';

const api = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
  },
});

export const imageBaseUrl = 'https://image.tmdb.org/t/p/w500';
export const backdropBaseUrl = 'https://image.tmdb.org/t/p/w1280';

export const apiService = {
  // Get trending movies
  getTrendingMovies: (timeWindow = 'week', page = 1) =>
    api.get(`/trending/movie/${timeWindow}`, { params: { page } }).then(res => res.data),

  // Get popular movies
  getPopularMovies: (page = 1) =>
    api.get('/movie/popular', { params: { page } }).then(res => res.data),

  // Get top rated movies
  getTopRatedMovies: (page = 1) =>
    api.get('/movie/top_rated', { params: { page } }).then(res => res.data),

  // Get upcoming movies
  getUpcomingMovies: (page = 1) =>
    api.get('/movie/upcoming', { params: { page } }).then(res => res.data),

  // Get movie details
  getMovieDetails: (movieId) =>
    api.get(`/movie/${movieId}`).then(res => res.data),

  // Get movie credits
  getMovieCredits: (movieId) =>
    api.get(`/movie/${movieId}/credits`).then(res => res.data),

  // Get movie videos
  getMovieVideos: (movieId) =>
    api.get(`/movie/${movieId}/videos`).then(res => res.data),

  // Get movie reviews
  getMovieReviews: (movieId, page = 1) =>
    api.get(`/movie/${movieId}/reviews`, { params: { page } }).then(res => res.data),

  // Get similar movies
  getSimilarMovies: (movieId, page = 1) =>
    api.get(`/movie/${movieId}/similar`, { params: { page } }).then(res => res.data),

  // Get movie recommendations
  getMovieRecommendations: (movieId, page = 1) =>
    api.get(`/movie/${movieId}/recommendations`, { params: { page } }).then(res => res.data),

  // Search movies
  searchMovies: (query, page = 1) =>
    api.get('/search/movie', { params: { query, page } }).then(res => res.data),

  // Get genres
  getGenres: () =>
    api.get('/genre/movie/list').then(res => res.data),

  // Discover movies with filters
  discoverMovies: (params) =>
    api.get('/discover/movie', { params }).then(res => res.data),
};