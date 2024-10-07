import React, { useState, useEffect,memo } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import FavoriteButton from './FavoriteButton';
import { getGenreNamesById } from '../utils/utils';

const MovieItem = ({ movie, genres }) => {

  const [genreList, setGenreList] = useState([]);

  useEffect(() => {
    getGenreNamesById(movie.genre_ids, genres).then((storedGenres) => {
      setGenreList(storedGenres);
    });
  }, []);

  return (
    <TouchableOpacity>
      <Link
        style={styles.link}
        href={{
          pathname: 'screens/MovieDetailScreen',
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
            <Text style={styles.title} numberOfLines={2} ellipsizeMode='tail'>{movie.title}</Text>
            <Text style={styles.releaseDate}>{movie.release_date}</Text>
            <View style={styles.favouriteContainer}>
              <Text style={styles.releaseDate}>{movie.vote_average}</Text>

            </View>

            <Text style={styles.genre}>
              {genreList}
            </Text>
          </View>
        </View>

      </Link>

      <View style={{ position: 'absolute', top: 60, right: 20, }} >
        <FavoriteButton  movie={movie} />
      </View>

    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  link: { marginBottom: 10 },
  movieItem: { flexDirection: 'row', marginBottom: 10 },
  poster: { width: 100, height: 150, borderRadius: 10 },
  info: { marginLeft: 10, justifyContent: 'center',},
  title: { fontSize: 18, fontWeight: 'bold',width: '65%', paddingRight:10 },
  releaseDate: { color: 'gray' },
  favouriteContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',

  },
  genre: {
    width: '65%',
    flexDirection: 'row',
    marginRight:10
  },
  fav: {
    position: 'absolute', top: 20, right: 20,
    width: 50, height: 50
  }
});

export default memo(MovieItem);
