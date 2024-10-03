import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { fetchMovieDetails } from '../services/api';
import { useLocalSearchParams } from 'expo-router';

const MovieDetailScreen = ({ route }) => {
  const [movie, setMovie] = useState(null);

  const { id, title, releaseYear } = useLocalSearchParams();

  useEffect(() => {
    const getMovieDetails = async () => {
      const data = await fetchMovieDetails(id);
      setMovie(data);
    };
    getMovieDetails();
  }, [id]);

  if (!movie) return <Text>Loading...</Text>;

  return (
    <View style={styles.container}>
      <Image
        style={styles.poster}
        source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
      />
      <Text style={styles.title}>{movie.title}</Text>
      <Text style={styles.info}>Release Date: {movie.release_date}</Text>
      <Text style={styles.info}>Rating: {movie.vote_average}</Text>
      <Text style={styles.info}>Genres: {movie.genres.map((g) => g.name).join(', ')}</Text>
      <Text style={styles.description}>{movie.overview}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  poster: { width: '100%', height: 300, borderRadius: 10, marginBottom: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  info: { fontSize: 16, marginBottom: 5 },
  description: { fontSize: 14, color: 'gray' },
});

export default MovieDetailScreen;
