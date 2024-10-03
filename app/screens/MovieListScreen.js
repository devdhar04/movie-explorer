import React, { useState, useEffect } from 'react';
 
import { View, StyleSheet } from 'react-native';
import { fetchMovies, searchMovies } from '../services/api';
import SearchBar from '../components/SearchBar';
import MovieList from '../components/MovieList';
import { getFavorites, saveFavorites } from '../storage/storage';

const MovieListScreen = () => {
  const [movies, setMovies] = useState([]);
  const [input, setInput] = useState("");
  const [favorites, setFavorites] = useState([]);

  // Load favorites from AsyncStorage
  const loadFavorites = async () => {
    const loadedFavorites = await getFavorites();
    setFavorites(loadedFavorites);
  };

  // Fetch movies from the API
  const fetchMoviesList = async () => {
    try {
      const data = await fetchMovies();
      if (data) {
        setMovies(data);
      }
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  // Search for movies
  const searchMoviesList = async (query) => {
    if (query.trim() === "") {
      fetchMoviesList();
      return;
    }
    try {
      const data = await searchMovies(query);
      setMovies(data.results);
    } catch (error) {
      console.error('Error searching movies:', error);
    }
  };

  
  // Effect to load favorites and fetch movies on mount
  useEffect(() => {
    loadFavorites();
    fetchMoviesList();
  }, []);

  return (
    <View style={styles.container}>
      <SearchBar input={input} setInput={setInput} searchMoviesList={searchMoviesList} />
      <MovieList movies={movies} favorites={favorites} />
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
});

export default MovieListScreen;