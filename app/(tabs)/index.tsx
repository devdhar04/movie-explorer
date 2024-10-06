import React, { useState,useContext } from 'react';
import { View, StyleSheet, ActivityIndicator, Text } from 'react-native';
import SearchBar from '../components/SearchBar';
import MovieList from '../components/MovieList';
import {SearchContext} from '../screens/search/SearchContext';

const MovieListScreen = () => {
  const [input, setInput] = useState("");
  
  const [page, setPage] = useState(1); // Current page number
  
  const { isLoading, movies, search, error ,loadMoreMovies} = useContext(SearchContext);
   
  
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
