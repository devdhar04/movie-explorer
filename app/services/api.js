import axios from 'axios';
import NetInfo from '@react-native-community/netinfo';
import { saveToCache, getMoviesList } from '../storage/storage';
import { Alert } from 'react-native';
import { API_CONFIG } from './apiConfig'; // Import the API config

// Centralized error handling
const handleError = (error) => {
  if (error.response) {
    console.error('Server Error:', error.response.data);
    Alert.alert('Error', error.response.data?.message || 'Server error occurred.');
  } else if (error.request) {
    console.error('Network Error:', error.message);
    Alert.alert('Network Error', 'Please check your internet connection.');
  } else {
    console.error('Unexpected Error:', error.message);
    Alert.alert('Error', 'An unexpected error occurred.');
  }
};

// Fetch from API with error handling
const fetchFromAPI = async (url, params = {}) => {
  try {
    const response = await axios.get(`${API_CONFIG.BASE_URL}${url}`, {
      headers: {
        Authorization: API_CONFIG.HEADERS.AUTHORIZATION,
        Accept: API_CONFIG.HEADERS.ACCEPT,
      },
      params,
    });
    return response.data;
  } catch (error) {
    handleError(error);
    throw error;
  }
};

// Cache handler with error fallback
const fetchWithCache = async (page, cacheKey, apiFunction) => {
  const netInfo = await NetInfo.fetch();

  if (!netInfo.isConnected || !netInfo.isInternetReachable) {
    const cachedData = await getMoviesList(page);
    if (cachedData?.results?.length > 0) {
      console.log('No internet, using cached data:', cachedData);
      return cachedData;
    } else {
      Alert.alert('No internet and no cached data available.');
      return [];
    }
  }

  try {
    const data = await apiFunction();
    await saveToCache(page, data); // Save fresh data to cache
    return data;
  } catch (error) {
    console.error('API fetch failed. Returning cached data:', error);
    const cachedData = await getMoviesList(page);
    return cachedData || [];
  }
};

// Movie Fetchers with cache fallback
export const fetchMovies = async (page) => {
  return fetchWithCache(page, `movies_page_${page}`, () =>
    fetchFromAPI(API_CONFIG.ENDPOINTS.DISCOVER, { page })
  );
};

export const fetchMovieDetails = async (id) => {
  try {
    return await fetchFromAPI(API_CONFIG.ENDPOINTS.MOVIE_DETAILS(id));
  } catch (error) {
    return null; // Return null on failure
  }
};

export const searchMovies = async (title, page) => {
  try {
    return await fetchFromAPI(API_CONFIG.ENDPOINTS.SEARCH_MOVIES, { query: title, page });
  } catch (error) {
    return null; // Return null on failure
  }
};

// Genre Fetchers
export const fetchGenres = async () => {
  try {
    return await fetchFromAPI(API_CONFIG.ENDPOINTS.GENRE_LIST);
  } catch (error) {
    return null; // Return null on failure
  }
};

// Get Cast with error handling
export const getCast = async (movieId) => {
  try {
    return await fetchFromAPI(API_CONFIG.ENDPOINTS.MOVIE_CREDITS(movieId), { api_key: API_CONFIG.API_KEY });
  } catch (error) {
    return null; // Return null on failure
  }
};

// Add Movie Rating with error handling
export const postRating = async (movieId, rating) => {
  try {
    const response = await axios.post(
      `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.ADD_RATING(movieId)}`,
      { value: rating },
      {
        headers: {
          Authorization: API_CONFIG.HEADERS.AUTHORIZATION,
          Accept: API_CONFIG.HEADERS.ACCEPT,
        },
      }
    );

    // Check if the response status indicates success
    if (response.status == 201) {
      Alert.alert('Success', 'Rating Updated .');
      return {
        success: true,
        data: response.data,
      };
    } else {
      // If the status code is not in the 2xx range, handle it as a failure
      return {
        success: false,
        message: `Unexpected response status: ${response.status}`,
        data: response.data,
      };
    }
  } catch (error) {
    handleError(error);
    return {
      success: false,
      message: error.message || 'An error occurred while posting the rating.',
    };
  }
};
