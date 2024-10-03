import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@favorites';
const GENRE_KEY = '@genres';

// Get items from AsyncStorage
export const getFavorites = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    console.error('Error loading favorites:', e);
    return [];
  }
};

// Save items to AsyncStorage
export const saveFavorites = async (favorites) => {
  try {
    const jsonValue = JSON.stringify(favorites);
    await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
  } catch (e) {
    console.error('Error saving favorites:', e);
  }
};


export const saveGenreList = async (genres) => {
  try {
    const jsonValue = JSON.stringify(genres);
    await AsyncStorage.setItem(GENRE_KEY, jsonValue);
  } catch (e) {
    console.error('Error saving favorites:', e);
  }
};

export const getGenreList = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(GENRE_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    console.error('Error loading Genre List:', e);
    return [];
  }
};