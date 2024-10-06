import React, { useState, useEffect,useContext } from 'react';
import { View, StyleSheet, ActivityIndicator, Text, Alert } from 'react-native';
import { fetchMovies, searchMovies, getGenre } from '../services/api';
import SearchBar from '../components/SearchBar';
import MovieList from '../components/MovieList';
import { saveGenreList } from '../storage/storage';

import {SearchContext} from '../screens/search/SearchContext';

const MovieListScreen = () => {
  const [input, setInput] = useState("");
  const [favorites, setFavorites] = useState([]);
  //const [loading, setLoading] = useState(true);
  
  const [page, setPage] = useState(1); // Current page number
  const [hasMore, setHasMore] = useState(true); // To track if more data is available
  
  const { isLoading, movies, search, error ,loadMoreMovies} = useContext(SearchContext);
   
  // Fetch genre list
  const fetchGenreList = async () => {
    try {
      const data = await getGenre();
      if (data) {
        saveGenreList(data.genres);
      }
    } catch (error) {
      console.error('Error fetching genres:', error);
    }
  };

  // Effect to load favorites and fetch movies on mount
  useEffect(() => {
    fetchGenreList();
  }, []);



  const handleSearch = (text) => {
    setInput(text);
    search(text);
};

  return (
    <View style={styles.container}>
      {isLoading && page === 1 ? ( // Show loading indicator only on first load
        <ActivityIndicator size="large" color="#0000ff" />
      ) : error ? (
        <Text style={styles.error}>{error}</Text>
      ) : (
        <>
          <SearchBar
           value={input}
           onChangeText={handleSearch} />
          <MovieList movies={movies} loadMoreMovies={loadMoreMovies} />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  error: {
    color: 'red',
    textAlign: 'center',
    marginVertical: 20,
  },
});

export default MovieListScreen;
