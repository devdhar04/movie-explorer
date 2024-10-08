import React, { useState, useEffect, memo } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import FavoriteButton from './FavoriteButton';
import RatingCircle from './RatingCircle';
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
      <View style={styles.container}>
        <Link
          style={styles.link}
          href={{
            pathname: 'screens/details/MovieDetailScreen',
            params: {
              id: movie.id,
              title: movie.title,
              releaseYear: movie.release_year,
              item: JSON.stringify(movie)
            },
          }}
        >

          <View style={styles.movieItem}>
            <Image
              style={styles.poster}
              source={{ uri: `https://image.tmdb.org/t/p/w200${movie.poster_path}` }}
            />
            <View style={styles.favouriteContainer}>
              <RatingCircle rating={movie?.vote_average} />
            </View>
            <View style={styles.info}>
              <Text style={styles.title} numberOfLines={2} ellipsizeMode='tail'>{movie.title}</Text>
              <Text style={styles.releaseDate}>{movie.release_date}</Text>

              <Text style={styles.genre}>
                {genreList}
              </Text>
            </View>
          </View>

        </Link>

        <View style={{ position: 'absolute', top: 60, right: 20, }} >
          <FavoriteButton movie={movie} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: { backgroundColor: '#f0f0f0', marginBottom: 10, borderRadius: 10, borderColor: '#D3D3D3', elevation: 1, borderWidth: 1 },
  link: { marginBottom: 0 },
  movieItem: { flexDirection: 'row', marginBottom: 10, },
  poster: { width: 100, height: 150, borderRadius: 10 },
  info: { marginLeft: 10, justifyContent: 'center', marginEnd: 30 },
  title: { fontSize: 18, fontWeight: 'bold', width: '65%', paddingRight: 10 },
  releaseDate: { color: 'gray' },
  favouriteContainer: {
    position: 'absolute', bottom: 2, left: 2,
  },
  genre: {
    flexDirection: 'row',
    width: '70%'
  },
  fav: {
    position: 'absolute', top: 20, right: 10,
  }
});

export default memo(MovieItem);
