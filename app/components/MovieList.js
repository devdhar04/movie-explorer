import React, { useState, useEffect } from 'react';
import { FlatList, StyleSheet ,View,Text} from 'react-native';
import MovieItem from './MovieItem';
import { saveFavorites, getGenreList } from '../storage/storage';
import { FavouritesContext } from '../screens/favourites/FavouritesContext'; 

const MovieList = ({ movies,loadMoreMovies }) => {
  const [genreList, setGenreList] = useState([]);

  /* 
  Load favorites when the component mounts
  */
  useEffect(() => {
    getGenreList().then((storedGenres) => {
      setGenreList(storedGenres); // Will log the array of genres
    });
  }, []);

  const renderEmptyList = () => (
    <View style={styles.emptyContainer}>
      <Text>No movies found!</Text>
    </View>
  );
  
  return (
    <FlatList
      data={movies}
      ListEmptyComponent={renderEmptyList}
      renderItem={({ item }) => {
        return (
          <MovieItem
            movie={item}
            genres = {genreList}
          />
        );
      }}
      keyExtractor={(item) => item.id.toString()}
      onEndReached={loadMoreMovies}
      onEndReachedThreshold={0.5}
    />
  );
};

const styles = StyleSheet.create({
  // You can add styles specific to MovieList here
});

export default MovieList;
