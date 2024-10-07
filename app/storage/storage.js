import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@favorites';
const GENRE_KEY = '@genres';

/**
 * Loads the list of favorite items from AsyncStorage.
 * @returns {Promise<Array>} An array of favorite items if found, otherwise an empty array.
 */
export const loadFavourites = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    console.error('Error loading favorites:', e);
    return [];
  }
};

/**
 * Saves a list of favorite items to AsyncStorage.
 * @param {Array} favorites - The list of favorite items to save.
 * @returns {Promise<void>}
 */
export const saveFavourites = async (favorites) => {
  try {
    const jsonValue = JSON.stringify(favorites);
    await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
  } catch (e) {
    console.error('Error saving favorites:', e);
  }
};

/**
 * Saves a list of movie genres to AsyncStorage.
 * @param {Array} genres - The list of genres to save.
 * @returns {Promise<void>}
 */
export const saveGenreList = async (genres) => {
  try {
    const jsonValue = JSON.stringify(genres);
    await AsyncStorage.setItem(GENRE_KEY, jsonValue);
  } catch (e) {
    console.error('Error saving favorites:', e);
  }
};

/**
 * Loads the list of movie genres from AsyncStorage.
 * @returns {Promise<Array>} An array of genres if found, otherwise an empty array.
 */
export const getGenreList = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(GENRE_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    console.error('Error loading Genre List:', e);
    return [];
  }
};

/**
 * Loads the list of movies for a specific page from AsyncStorage (cache).
 * @param {number} page - The page number for which to retrieve the cached movies.
 * @returns {Promise<Array>} The list of cached movies for the specified page, otherwise an empty array.
 */
export const getMoviesList = async (page) => {
  console.log('get from cache',page);
  try {
    const jsonValue = await AsyncStorage.getItem(`${page}`);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    console.error('Error loading movies list from cache:', e);
    return [];
  }
};

/**
 * Saves the list of movies for a specific page to AsyncStorage (cache).
 * @param {number} page - The page number to associate with the cached movies.
 * @param {Array} response - The list of movies to cache.
 * @returns {Promise<void>}
 */
export const saveToCache = async (page,response) => {
  console.log('saveToCache',page);
  try {
    await AsyncStorage.setItem(`${page}`, JSON.stringify(response));
  } catch (e) {
    console.error('Error saving movies list in cache:', e);
  }
};