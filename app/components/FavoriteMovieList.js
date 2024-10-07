import React, {useContext} from 'react';
import { FlatList, StyleSheet ,View,Text} from 'react-native';
import MovieItem from './MovieItem';
import { FavouritesContext } from '../screens/favourites/FavouritesContext'; 
import {MoviesContext} from '../screens/movies/MoviesContext';

const FavoriteMovieList = ({ }) => {
  
  const { favourites} = useContext(FavouritesContext);
  const { genres} = useContext(MoviesContext);

  const renderEmptyList = () => (
    <View style={styles.emptyContainer}>
      <Text>No movies found!</Text>
    </View>
  );
  
  return (
    <FlatList
      data={favourites}
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
    />
  );
};

const styles = StyleSheet.create({
  emptyContainer : {
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default FavoriteMovieList;
