import React, { useContext } from 'react';
import { FlatList, StyleSheet ,View,Text} from 'react-native';
import MovieItem from './MovieItem';
import {MoviesContext} from '../screens/movies/MoviesContext';

const MovieList = ({ movies,loadMoreMovies }) => {
  
  const { genres} = useContext(MoviesContext);

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
            genres = {genres}
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
  emptyContainer:{
    alignContent:'center'
  }
});

export default MovieList;
