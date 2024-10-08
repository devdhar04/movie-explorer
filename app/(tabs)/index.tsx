import React, { useState, useContext } from 'react';
import { View, StyleSheet, ActivityIndicator, Text } from 'react-native';
import SearchBar from '../components/SearchBar';
import MovieList from '../components/MovieList';
import { SearchContext } from '../screens/search/SearchContext';

const MovieListScreen = () => {
  const [input, setInput] = useState("");

  const { movies, search, error, loadMoreMovies } = useContext(SearchContext);

  const hasError = !!error;

  const handleSearch = (text) => {
    setInput(text);
    search(text);
  };

  return (
    <View style={styles.container}>

      <SearchBar
        value={input}
        onChangeText={handleSearch} />
      {hasError && (
        <View style={styles.emptyContainer}>
          <Text style={styles.error}>An error occurred: {error}</Text>
        </View>
      )}
      {!hasError && (
        <MovieList movies={movies} loadMoreMovies={loadMoreMovies} />
      )}
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, margin: 5 },
  error: {
    color: 'red',
    textAlign: 'center',
    marginVertical: 20,
  },
  emptyContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default MovieListScreen;
