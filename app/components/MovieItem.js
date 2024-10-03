import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import FavoriteButton from './FavoriteButton';

const MovieItem = ({ movie,isFavorite,onPress}) => {


  return (
    <TouchableOpacity>
      <Link
        style={styles.link}
        href={{
          pathname: '/screens/movieDetailScreen',
          params: {
            id: movie.id,
            title: movie.title,
            releaseYear: movie.release_year
          },
        }}
      >
        <View style={styles.movieItem}>
          <Image
            style={styles.poster}
            source={{ uri: `https://image.tmdb.org/t/p/w200${movie.poster_path}` }}
          />
          <View style={styles.info}>
            <Text style={styles.title}>{movie.title}</Text>
            <Text style={styles.releaseDate}>{movie.release_date}</Text>
            <View style={styles.favouriteContainer}>
              <Text style={styles.releaseDate}>{movie.vote_average}</Text>
              <FavoriteButton isFavorite={isFavorite}  onPress={onPress} />
            </View>
          </View>
        </View>
      </Link>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  link: { marginBottom: 10 },
  movieItem: { flexDirection: 'row', marginBottom: 10 },
  poster: { width: 100, height: 150, borderRadius: 10 },
  info: { marginLeft: 10, justifyContent: 'center' },
  title: { fontSize: 18, fontWeight: 'bold' },
  releaseDate: { color: 'gray' },
  favouriteContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default MovieItem;
