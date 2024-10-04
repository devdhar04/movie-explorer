import axios from 'axios';
import { saveToCache, getMoviesList } from '../storage/storage';
import { Alert } from 'react-native';
import NetInfo from '@react-native-community/netinfo';

const BASE_URL = 'https://api.themoviedb.org/3/movie/';

const API_URL = 'https://api.themoviedb.org/3/discover/movie';
const token = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNTdjNjA0NzE1YThlMDZkODcyNzdmZjliZDg4OWZkZSIsIm5iZiI6MTcyNzgwMTAwOS41NTg0OTIsInN1YiI6IjU4ZjI2MzBjOTI1MTQxM2Q3MjAwMWMzNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.rlWnermTu4AENojlJ1Gs77N3g6_umxhFzTQ6qlqIoy4';
const SEARCH = 'https://api.themoviedb.org/3/search/movie';
const GENRE = 'https://api.themoviedb.org/3/genre/movie/list';
const ADD_RATING = 'https://api.themoviedb.org/3/movie';
const API_KEY = 'b57c604715a8e06d87277ff9bd889fde';

export const fetchMovies = async (page) => {

  const netInfo = await NetInfo.fetch();
  
  if (!netInfo.isConnected && !netInfo.isInternetReachable) {
    //Alert.alert('Loading from cache '+netInfo.isInternetReachable);
    
    const cachedData = await getMoviesList(page);
    console.log('No internet connection, returning cached data',cachedData);
    if (cachedData && cachedData.results.length > 0) {
      return cachedData;
    } else {
      return []; // If there's no cached data, return an empty array
    }
  }
  try {
    const response = await axios.get(API_URL, {
      params: {
        page: page,
      },
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    });
    saveToCache(page, response.data);
    return response.data;
  } catch (error) {
    const cachedData = await getMoviesList(cacheKey);
    if (cachedData) {
      console.log('Network error, returning cached data.');
      return cachedData;
    }
    return [];
  }
};

export const fetchMovieDetails = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/${id}`, {

      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching movie details:', error);
    return null;
  }
};

export const searchMovies = async (title) => {
  try {
    const response = await axios.get(`${SEARCH}`, {
      params: { query: title },
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching movie details:', error);
    return null;
  }
};

export const getGenre = async () => {
  try {
    const response = await axios.get(`${GENRE}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching movie details:', error);
    return null;
  }
};

export const getCast = async (movieId) => {
  try {
    const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/credits`, {
      params: { api_key: API_KEY },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching movie details:', error);
    return null;
  }
};


export const addRating = async (movieId) => {
  try {
    const response = await axios.post(`https://api.themoviedb.org/3/movie/${movieId}/rating`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
      data: '{"value":8.5}'
    });
    return response.data;
  } catch (error) {
    console.error('Error Adding Rating:', error);
    return null;
  }
};