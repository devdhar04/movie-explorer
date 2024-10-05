import React, { useState, useEffect ,useContext} from 'react';
import { FlatList, StyleSheet ,View,Text} from 'react-native';
import MovieItem from './MovieItem';
import { getGenreList } from '../storage/storage';
import { FavouritesContext } from '../screens/favourites/FavouritesContext'; 

const FavoriteMovieList = ({ }) => {
  const [genreList, setGenreList] = useState([]);
  const { favourites} = useContext(FavouritesContext);


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
      data={favourites}
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
    />
  );
};

const styles = StyleSheet.create({
  // You can add styles specific to MovieList here
});

export default FavoriteMovieList;
