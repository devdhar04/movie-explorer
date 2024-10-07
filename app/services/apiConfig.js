// apiConfig.js

export const API_CONFIG = {
    BASE_URL: 'https://api.themoviedb.org/3',
    TOKEN: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNTdjNjA0NzE1YThlMDZkODcyNzdmZjliZDg4OWZkZSIsIm5iZiI6MTcyNzgwMTAwOS41NTg0OTIsInN1YiI6IjU4ZjI2MzBjOTI1MTQxM2Q3MjAwMWMzNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.rlWnermTu4AENojlJ1Gs77N3g6_umxhFzTQ6qlqIoy4',
    API_KEY: 'b57c604715a8e06d87277ff9bd889fde',
  
    HEADERS: {
        AUTHORIZATION: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNTdjNjA0NzE1YThlMDZkODcyNzdmZjliZDg4OWZkZSIsIm5iZiI6MTcyNzgwMTAwOS41NTg0OTIsInN1YiI6IjU4ZjI2MzBjOTI1MTQxM2Q3MjAwMWMzNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.rlWnermTu4AENojlJ1Gs77N3g6_umxhFzTQ6qlqIoy4`,
        ACCEPT: 'application/json',
      },
      
    ENDPOINTS: {
      DISCOVER: '/discover/movie',
      MOVIE_DETAILS: (id) => `/movie/${id}`,
      SEARCH_MOVIES: '/search/movie',
      GENRE_LIST: '/genre/movie/list',
      MOVIE_CREDITS: (id) => `/movie/${id}/credits`,
      ADD_RATING: (id) => `/movie/${id}/rating`,
    },
  };
  