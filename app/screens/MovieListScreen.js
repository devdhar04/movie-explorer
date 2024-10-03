import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { fetchMovies } from '../services/api';

const MovieListScreen = ({ navigation }) => {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const searchMovies = async (query) => {
    const data = await fetchMovies(query);
    setMovies(data);
  };

  useEffect(() => {
    searchMovies('popular');
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('MovieDetails', { movieId: item.id })}>
      <View style={styles.movieItem}>
        <Image
          style={styles.poster}
          source={{ uri: `https://image.tmdb.org/t/p/w200${item.poster_path}` }}
        />
        <View style={styles.info}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.releaseDate}>{item.release_date}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search Movies"
        value={searchQuery}
        onChangeText={(text) => setSearchQuery(text)}
        onSubmitEditing={() => searchMovies(searchQuery)}
      />
      <FlatList
        data={movies}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  movieItem: { flexDirection: 'row', marginBottom: 10 },
  poster: { width: 100, height: 150, borderRadius: 10 },
  info: { marginLeft: 10, justifyContent: 'center' },
  title: { fontSize: 18, fontWeight: 'bold' },
  releaseDate: { color: 'gray' },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
});

export default MovieListScreen;
