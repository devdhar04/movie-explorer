import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator, Text, FlatList } from 'react-native';
import { fetchMovies, searchMovies, getGenre } from '../services/api';
import SearchBar from '../components/SearchBar';
import MovieList from '../components/MovieList';
import { getFavorites, saveGenreList } from '../storage/storage';
import { getUniqueMovies } from '../utils/utils';

const MovieListScreen = () => {
  const [movies, setMovies] = useState([]);
  const [input, setInput] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1); // Current page number
  const [hasMore, setHasMore] = useState(true); // To track if more data is available


  // Load favorites from AsyncStorage
  const loadFavorites = async () => {
    try {
      const loadedFavorites = await getFavorites();
      setFavorites(loadedFavorites);
    } catch (error) {
      console.error('Error loading favorites:', error);
      setError('Failed to load favorites.');
    }
  };


  // Fetch movies from the API
  const fetchMoviesList = async () => {

    setLoading(true);
    try {
      console.log('fetchMovies', page);
      const data = await fetchMovies(page); // Pass the page number
      console.log('new data', data);
      if (data.results) {
        setMovies((prevMovies) => {
          // Combine previous movies with new results
          const combinedMovies = [...prevMovies, ...data.results];

          // Filter out duplicate movies based on 'id'
          const uniqueMovies = getUniqueMovies(combinedMovies);

          return uniqueMovies; // Set the state with unique movies only
        });

        if (data.page < data.total_pages) {
          setHasMore(true);
        }
        else {
          setHasMore(false);
        }

      }
    } catch (error) {
      setError('Failed to fetch movies.');
    } finally {
      setLoading(false);
    }
  };

  // Search for movies
  const searchMoviesList = async (query) => {
    //setLoading(true);
    if (query.trim() === "") {
      setMovies([]); // Clear current movies when search is empty
      fetchMoviesList();
    }
    else {
      try {
        const data = await searchMovies(query);
        setMovies(data.results);
      } catch (error) {

        setError('Failed to search movies.');
      } finally {
        setLoading(false);
      }
    }
  };

  // Fetch genre list
  const fetchGenreList = async () => {
    try {
      const data = await getGenre();
      if (data) {
        saveGenreList(data.genres);
      }
    } catch (error) {
      console.error('Error fetching genres:', error);
      setError('Failed to fetch genres.');
    }
  };

  // Effect to load favorites and fetch movies on mount
  useEffect(() => {
    fetchGenreList();
    loadFavorites();
  }, []);

  useEffect(() => {

    fetchMoviesList(); // Load initial movies
  }, [page]);

  const loadMoreMovies = () => {
    console.log('fetchMoviesList page before', page);
    if (hasMore) {
      setPage((prevPage) => prevPage + 1);
      console.log('fetchMoviesList page', page);
    }
  };

  return (
    <View style={styles.container}>
      {loading && page === 1 ? ( // Show loading indicator only on first load
        <ActivityIndicator size="large" color="#0000ff" />
      ) : error ? (
        <Text style={styles.error}>{error}</Text>
      ) : (
        <>
          <SearchBar input={input} setInput={setInput} searchMoviesList={searchMoviesList} />
          <MovieList movies={movies} favorites={favorites} loadMoreMovies={loadMoreMovies} />
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
